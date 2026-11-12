# Kendra Hartnett — Independent Software & Automation

An inquiry-focused service website built with Next.js App Router, TypeScript, Tailwind CSS, Motion, React Hook Form, Zod, Lucide, and Resend. The page is server rendered; the navigation, reveals, and form are client components.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with your own configuration. Never commit it. Run `npm run build`, `npm run typecheck`, and `npm run lint` before deployment.

## Contact email setup

1. Create a Resend API key in your Resend account.
2. Verify your sending domain with Resend, including its required DNS records.
3. Set `CONTACT_FROM_EMAIL` to an address on that verified domain.
4. Set `CONTACT_TO_EMAIL` to your receiving inbox and `RESEND_API_KEY` to the secret key.
5. Create an Upstash Redis database. Set `RATE_LIMIT_UPSTASH_REDIS_REST_URL` and `RATE_LIMIT_UPSTASH_REDIS_REST_TOKEN` for distributed rate limiting. Production submissions fail closed if this service is unavailable or not configured.
6. Set `NEXT_PUBLIC_SITE_URL` to the actual service site URL after choosing a deployment domain. This controls canonical, Open Graph URL, and sitemap. It must be this site, not the separate portfolio.
7. Add the same variables to the hosting platform, deploy, and send a real test inquiry. Confirm Resend accepted it and check the receiving inbox. Provider acceptance does not guarantee inbox placement.

The server endpoint validates and caps the payload, checks a honeypot, limits each network address to five requests per ten minute bucket using shared Redis, and sends HTML and plain-text versions. Visitor email is used as `replyTo`; the verified address remains the sender. It avoids logging form content. In local development without rate limit configuration, requests may proceed for testing. Live delivery is untested until valid credentials, sender verification, and a test submission are available.

## Payments

The contact form mentions Stripe as the accepted provider for agreed project fees. There is no checkout or public payment collection. A payment workflow can be added separately after scope, pricing, and terms are agreed.

## Deployment

Deploy as a Node-compatible Next.js application. Configure all environment variables in the host, verify the sender domain, and confirm the shared rate limit service works before publishing. The site bundles Space Grotesk, Inter, DM Serif Display, and IBM Plex Mono through `next/font/local`.
