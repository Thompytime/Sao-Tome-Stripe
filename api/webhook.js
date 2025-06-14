import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.sk_test_51RVwRIQxzAZEQ1IgUiNqfZfqKRs0rg4fQYIMs5ETLnuIMAFD5kyHRqYAMSYor2AOEr3dAqpKi8v0Z9upnzUkhB5c00jojYcPq9);

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body for signature verification
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ Payment verified for session:', session.id);

    // TODO: mark user as paid in your DB or cookie
  }

  res.status(200).json({ received: true });
}
