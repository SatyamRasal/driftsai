const crypto = require('crypto');
const { dbFetch, requireEnv } = require('./lib/supabaseAdmin');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
    const secret = requireEnv('RAZORPAY_KEY_SECRET');

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ verified: false, error: 'Signature verification failed' });
    }

    await dbFetch('/rest/v1/payments?on_conflict=payment_id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify([{
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
        product_id: body.productId || null,
        product_name: body.productName || null,
        amount: Number(body.amount || 0),
        currency: String(body.currency || 'INR').toUpperCase(),
        customer_name: body.customerName || null,
        customer_email: body.customerEmail || null,
        status: 'verified'
      }])
    });

    return res.status(200).json({ verified: true });
  } catch (error) {
    return res.status(500).json({ verified: false, error: error.message || 'Verification failed' });
  }
};
