import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema, escapeHtml } from '@/lib/contact';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  if (Number(request.headers.get('content-length') || 0) > 12000) return NextResponse.json({ error: 'Submission is too large.' }, { status: 413 });
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ error: 'Submission is too large.' }, { status: 413 });
    body = JSON.parse(raw);
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const limit = await rateLimit(ip);
  if (limit === 'limited') return NextResponse.json({ error: 'Too many inquiries. Please try again later.' }, { status: 429 });
  if (limit === 'unavailable') return NextResponse.json({ error: 'The form is temporarily unavailable. Please try again later.' }, { status: 503 });
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return NextResponse.json({ error: 'The form is temporarily unavailable. Please try again later.' }, { status: 503 });
  const { name, email, company, service, project } = parsed.data;
  const rows = [['Name', name], ['Email', email], ['Company', company || 'Not provided'], ['Service', service], ['Project', project]];
  const html = `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#303036"><p style="color:#77777f;text-transform:uppercase;letter-spacing:.12em">Kendra Hartnett website</p><h1 style="font-size:24px">New project inquiry</h1>${rows.map(([label,value]) => `<p><strong>${label}</strong><br>${escapeHtml(value).replace(/\n/g,'<br>')}</p>`).join('')}</div>`;
  const text = `New project inquiry from the Kendra Hartnett website\n\n${rows.map(([label,value]) => `${label}: ${value}`).join('\n\n')}`;
  try {
    const resend = new Resend(RESEND_API_KEY);
    const result = await resend.emails.send({ from: CONTACT_FROM_EMAIL, to: CONTACT_TO_EMAIL, replyTo: email, subject: `New Project Inquiry — ${service} — ${name}`, html, text });
    if (result.error || !result.data?.id) { console.error('Contact email provider rejected request'); return NextResponse.json({ error: 'Your inquiry could not be sent. Please try again.' }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch { console.error('Contact email provider request failed'); return NextResponse.json({ error: 'Your inquiry could not be sent. Please try again.' }, { status: 502 }); }
}
