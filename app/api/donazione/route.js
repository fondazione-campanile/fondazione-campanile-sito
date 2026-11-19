import Stripe from 'stripe';

const MINIMO = 5;
const MASSIMO = 10000;

export async function POST(richiesta) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { importo, mensile } = await richiesta.json();
  const euro = Number(importo);

  // Mai fidarsi dei dati che arrivano dal browser: si ricontrollano qui
  if (!Number.isInteger(euro) || euro < MINIMO || euro > MASSIMO) {
    return Response.json({ errore: 'Importo non valido' }, { status: 400 });
  }

  const origine = new URL(richiesta.url).origin;

  const sessione = await stripe.checkout.sessions.create({
    mode: mensile ? 'subscription' : 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: euro * 100,
          product_data: { name: mensile ? 'Donazione mensile' : 'Donazione' },
          ...(mensile && { recurring: { interval: 'month' } }),
        },
      },
    ],
    ...(!mensile && { submit_type: 'donate' }),
    locale: 'it',
    success_url: `${origine}/donazioni/grazie`,
    cancel_url: `${origine}/donazioni`,
  });

  return Response.json({ url: sessione.url });
}