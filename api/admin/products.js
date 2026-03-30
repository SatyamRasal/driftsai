const { assertAdmin, dbFetch } = require('../lib/supabaseAdmin');

function jsonParse(req) {
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  return req.body || {};
}

function normalize(body) {
  return {
    name: body.name,
    slug: body.slug,
    category: body.category || null,
    status: body.status || 'Live',
    short_description: body.short_description || null,
    description: body.description || null,
    price_inr: Number(body.price_inr || 0),
    price_usd: body.price_usd === null || body.price_usd === undefined || body.price_usd === '' ? null : Number(body.price_usd),
    demo_url: body.demo_url || null,
    hero_image: body.hero_image || null,
    screenshots: Array.isArray(body.screenshots) ? body.screenshots : [],
    features: Array.isArray(body.features) ? body.features : [],
    is_active: body.is_active !== false
  };
}

module.exports = async (req, res) => {
  try {
    await assertAdmin(req);

    if (req.method === 'GET') {
      const products = await dbFetch('/rest/v1/products?select=*&order=created_at.desc');
      return res.status(200).json({ products });
    }

    const body = jsonParse(req);

    if (req.method === 'POST') {
      const rows = await dbFetch('/rest/v1/products', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify([normalize(body)])
      });
      return res.status(200).json({ product: rows[0] });
    }

    if (req.method === 'PUT') {
      if (!body.id) return res.status(400).json({ error: 'Missing product id' });
      const rows = await dbFetch(`/rest/v1/products?id=eq.${body.id}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(normalize(body))
      });
      return res.status(200).json({ product: rows[0] || null });
    }

    if (req.method === 'DELETE') {
      if (!body.id) return res.status(400).json({ error: 'Missing product id' });
      await dbFetch(`/rest/v1/products?id=eq.${body.id}`, {
        method: 'DELETE',
        headers: { Prefer: 'return=minimal' }
      });
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Product request failed' });
  }
};
