function requireEnv(name, fallback = undefined) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}
module.exports = { requireEnv };
