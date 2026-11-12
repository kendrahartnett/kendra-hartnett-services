'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, LoaderCircle, ShieldCheck } from 'lucide-react';
import { contactSchema, services, type ContactInput, type Contact } from '@/lib/contact';

export function ContactForm() {
  const [status,setStatus] = useState<'idle'|'success'|'error'>('idle');
  const [serverError,setServerError] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput, unknown, Contact>({ resolver: zodResolver(contactSchema), defaultValues: { name:'', email:'', company:'', project:'', website:'' } });
  const submit = handleSubmit(async values => {
    setStatus('idle'); setServerError('');
    try {
      const response = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(values) });
      const result: {ok?:boolean;error?:string} = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Your inquiry could not be sent. Please try again.');
      setStatus('success'); reset();
    } catch (error) { setServerError(error instanceof Error ? error.message : 'Your inquiry could not be sent. Please try again.'); setStatus('error'); }
  });
  return <form onSubmit={submit} noValidate className="contact-form"><div className="form-row"><div className="field"><label htmlFor="name">Your name <span>*</span></label><input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')}/>{errors.name && <p className="field-error" id="name-error">{errors.name.message}</p>}</div><div className="field"><label htmlFor="email">Business email <span>*</span></label><input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')}/>{errors.email && <p className="field-error" id="email-error">{errors.email.message}</p>}</div></div><div className="form-row"><div className="field"><label htmlFor="company">Company or organization</label><input id="company" autoComplete="organization" {...register('company')}/>{errors.company && <p className="field-error">{errors.company.message}</p>}</div><div className="field"><label htmlFor="service">What can I help you with? <span>*</span></label><select id="service" defaultValue="" aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined} {...register('service')}><option value="" disabled>Select a service</option>{services.map(service => <option key={service}>{service}</option>)}</select>{errors.service && <p className="field-error" id="service-error">{errors.service.message}</p>}</div></div><div className="field"><label htmlFor="project">Tell me a little about your project <span>*</span></label><textarea id="project" rows={6} aria-invalid={!!errors.project} aria-describedby={errors.project ? 'project-error' : undefined} placeholder="What are you hoping to solve or build?" {...register('project')}/>{errors.project && <p className="field-error" id="project-error">{errors.project.message}</p>}</div><div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" {...register('website')}/></div><div className="form-bottom"><button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="spin" size={17}/> Sending...</> : <>Send My Inquiry <ArrowUpRight size={17}/></>}</button><p>Your information will only be used to respond to your inquiry.</p></div><p className="stripe-note"><ShieldCheck size={16}/> Secure payments accepted through <strong>stripe</strong>.</p>{status === 'success' && <p role="status" className="form-success">Thank you. Your inquiry was accepted for delivery. I’ll be in touch soon.</p>}{status === 'error' && <p role="alert" className="form-error">{serverError}</p>}</form>;
}
