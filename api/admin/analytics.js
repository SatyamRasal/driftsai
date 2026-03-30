const { assertAdmin, dbFetch } = require('../lib/supabaseAdmin');

module.exports = async (req, res) => {
  try {
    await assertAdmin(req);
    const [products, supportRequests, inquiries, payments] = await Promise.all([
      dbFetch('/rest/v1/products?select=id'),
      dbFetch('/rest/v1/support_requests?select=id'),
      dbFetch('/rest/v1/inquiries?select=id'),
      dbFetch('/rest/v1/payments?select=id')
    ]);
    res.status(200).json({
      products: products.length,
      supportRequests: supportRequests.length,
      inquiries: inquiries.length,
      payments: payments.length
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Analytics request failed' });
  }
};
