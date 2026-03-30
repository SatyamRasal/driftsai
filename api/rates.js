module.exports = async function handler(req, res) {
  try {
    const base = String(req.query.base || 'USD').toUpperCase();
    const url = `https://open.er-api.com/v6/latest/${base}`;
    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await r.json();
    if (!r.ok || data.result !== 'success') {
      throw new Error(data['error-type'] || 'FX API failed');
    }
    const usdInr = base === 'USD' ? Number(data.rates.INR) : 1 / Number(data.rates.USD);
    const inrUsd = base === 'USD' ? 1 / Number(data.rates.INR) : Number(data.rates.USD);
    res.status(200).json({
      base,
      usdInr: Number(usdInr.toFixed(4)),
      inrUsd: Number(inrUsd.toFixed(6)),
      source: 'open.er-api.com',
      updatedAt: data.time_last_update_utc || null
    });
  } catch (error) {
    res.status(200).json({
      base: 'USD',
      usdInr: 83,
      inrUsd: 1 / 83,
      source: 'fallback',
      error: error.message
    });
  }
};
