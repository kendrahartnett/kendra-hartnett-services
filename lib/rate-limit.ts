import { createHmac } from 'node:crypto';

export async function rateLimit(ip: string): Promise<'ok' | 'limited' | 'unavailable'> {
  const url = process.env.RATE_LIMIT_UPSTASH_REDIS_REST_URL;
  const token = process.env.RATE_LIMIT_UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return 'unavailable';
  const key = createHmac('sha256', token).update(ip).digest('hex').slice(0, 32);
  const bucket = Math.floor(Date.now() / 600000);
  try {
    const response = await fetch(`${url}/pipeline`, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([['INCR', `contact:${bucket}:${key}`], ['EXPIRE', `contact:${bucket}:${key}`, 600]]),
      cache: 'no-store', signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) return 'unavailable';
    const result: unknown = await response.json();
    if (!Array.isArray(result) || typeof result[0]?.result !== 'number') return 'unavailable';
    return result[0].result > 5 ? 'limited' : 'ok';
  } catch { return 'unavailable'; }
}
