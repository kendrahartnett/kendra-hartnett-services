import { z } from 'zod';

export const services = ['Custom Software Development','Business Automation','AI-Powered Solutions','Website Development','API Integration','Something Else','Not Sure Yet'] as const;
const clean = (value: string) => value.trim().replace(/\r\n?/g, '\n');
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100).transform(clean),
  email: z.email('Please enter a valid email address.').max(254).transform(value => value.trim().toLowerCase()),
  company: z.string().max(120).default('').transform(clean),
  service: z.enum(services, { error: 'Please choose a service.' }),
  project: z.string().trim().min(20, 'Please share at least 20 characters about your project.').max(5000).transform(clean),
  website: z.string().max(200).default(''),
});
export type ContactInput = z.input<typeof contactSchema>;
export type Contact = z.output<typeof contactSchema>;
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]!));
