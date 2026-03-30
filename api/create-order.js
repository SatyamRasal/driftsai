const { requireEnv } = require('./lib/env');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const keyId = requireEnv('RAZORPAY_KEY_ID');
    const keySecret = requireEnv('RAZORPAY_KEY_SECRET');

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const amount = Math.round(Number(body.amount || 0));
    const currency = String(body.currency || 'INR').toUpperCase();
    const receipt = String(body.receipt || `rcpt_${Date.now()}`).slice(0, 40);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }
    if (!['INR', 'USD'].includes(currency)) {
      return res.status(400).json({ error: 'Unsupported currency' });
    }

    const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt,
        notes: body.notes || {}
      })
    });

    const data = await orderRes.json();
    if (!orderRes.ok) {
      return res.status(orderRes.status).json({ error: data?.error?.description || data?.error || 'Order creation failed' });
    }

    res.status(200).json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not create order' });
  }
};
