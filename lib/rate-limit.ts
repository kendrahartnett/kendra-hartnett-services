import { createHash, createHmac } from 'node:crypto';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_INQUIRIES = 5;
const localHits = new Map<string, { count: number; expires: number }>();

function localRateLimit(ip: string): 'local' | 'limited' {
  const now = Date.now();
  const key = createHash('sha256').update(ip).digest('hex').slice(0, 32);
  const current = localHits.get(key);
  if (!current || current.expires <= now) {
    if (localHits.size >= 10_000) {
      for (const [storedKey, entry] of localHits) {
        if (entry.expires <= now) localHits.delete(storedKey);
      }
      if (localHits.size >= 10_000) localHits.delete(localHits.keys().next().value!);
    }
    localHits.set(key, { count: 1, expires: now + WINDOW_MS });
    return 'local';
  }
  current.count += 1;
  return current.count > MAX_INQUIRIES ? 'limited' : 'local';
}

export async function rateLimit(ip: string): Promise<'ok' | 'local' | 'limited' | 'unavailable'> {
  const url = process.env.RATE_LIMIT_UPSTASH_REDIS_REST_URL;
  const token = process.env.RATE_LIMIT_UPSTASH_REDIS_REST_TOKEN;
  if (!url && !token) return localRateLimit(ip);
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
    return result[0].result > MAX_INQUIRIES ? 'limited' : 'ok';
  } catch { return 'unavailable'; }
}
