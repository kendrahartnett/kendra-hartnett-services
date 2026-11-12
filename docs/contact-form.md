# Contact form operation

The contact form validates inquiries on the server and sends them with Resend. A successful API response means Resend accepted the message; inbox arrival still depends on the recipient's mail system.

The form previously returned `503` for every valid production inquiry when the optional Upstash Redis variables were absent. It now uses a five-request, ten-minute **per-instance** limit when neither Redis variable is set, so missing Redis configuration does not stop email delivery. This fallback is not distributed: separate serverless instances can each allow their own five requests. It provides basic protection alongside the honeypot and validation, but it is not a production-wide limit.

For a shared limit across instances, configure both `RATE_LIMIT_UPSTASH_REDIS_REST_URL` and `RATE_LIMIT_UPSTASH_REDIS_REST_TOKEN` in the hosting environment. If only one is configured, or the configured service is unavailable, the form returns `503` rather than silently bypassing the shared limit. Keep the Resend key and email addresses in server-side environment variables.
