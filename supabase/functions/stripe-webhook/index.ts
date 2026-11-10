// Stripe webhook handler stub (Deno)
Deno.serve(async (req) => {
  const body = await req.text();
  console.log('stripe webhook received', body.slice(0, 100));
  return new Response(JSON.stringify({ received: true }), { headers: { 'content-type': 'application/json' } });
});
