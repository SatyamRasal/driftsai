const { assertAdmin, dbFetch } = require('../lib/supabaseAdmin');

module.exports = async (req, res) => {
  try {
    await assertAdmin(req);
    const [supportRequests, inquiries, payments] = await Promise.all([
      dbFetch('/rest/v1/support_requests?select=*&order=created_at.desc'),
      dbFetch('/rest/v1/inquiries?select=*&order=created_at.desc'),
      dbFetch('/rest/v1/payments?select=*&order=created_at.desc')
    ]);
    res.status(200).json({ supportRequests, inquiries, payments });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Leads request failed' });
  }
};
