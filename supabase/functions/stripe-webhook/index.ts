// Stripe webhook handler with signature verification (Deno)
const secret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

async function verifySignature(body: string, sigHeader: string): Promise<boolean> {
  if (!secret || !sigHeader) return false;
  const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')));
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signed = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${body}`));
  const hex = [...new Uint8Array(signed)].map(b => b.toString(16).padStart(2, '0')).join('');
  // constant-time compare
  if (hex.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') ?? '';
  if (!await verifySignature(body, sig)) {
    return new Response('Invalid signature', { status: 400 });
  }
  const event = JSON.parse(body);
  console.log('stripe event:', event.type);
  // TODO: upsert into subscriptions using a service-role Supabase client.
  return new Response(JSON.stringify({ received: true }), { headers: { 'content-type': 'application/json' } });
});
