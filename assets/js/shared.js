import { CONFIG } from "./config.js";

const THEME_KEY = "driftsai-theme";
const CURRENCY_KEY = "driftsai-currency";
const RATE_KEY = "driftsai-rate-cache";

export function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.getAttribute("href");
    const active = target === path || (path === "" && target === "index.html");
    link.classList.toggle("active", active);
  });
}

export function initThemeToggle() {
  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  document.body.classList.toggle("dark", theme === "dark");

  const button = document.querySelector("[data-theme-toggle]");
  if (button) {
    button.addEventListener("click", () => {
      const next = document.body.classList.toggle("dark") ? "dark" : "light";
      localStorage.setItem(THEME_KEY, next);
      button.setAttribute("aria-pressed", String(next === "dark"));
      button.textContent = next === "dark" ? "Light" : "Dark";
    });
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.textContent = theme === "dark" ? "Light" : "Dark";
  }
}

export function initMobileMenu() {
  const button = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!button || !menu) return;
  button.addEventListener("click", () => {
    menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(menu.classList.contains("open")));
  });
}

export function isIndia() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const locale = navigator.language || "";
    return tz.includes("Kolkata") || tz.includes("India") || locale.toLowerCase().includes("in");
  } catch {
    return false;
  }
}

export function getPreferredCurrency() {
  return localStorage.getItem(CURRENCY_KEY) || (isIndia() ? "INR" : "USD");
}

export function setPreferredCurrency(currency) {
  localStorage.setItem(CURRENCY_KEY, currency);
  setCurrentCurrencyBadge(currency);
}

export function setCurrentCurrencyBadge(currency) {
  document.querySelectorAll("[data-currency-badge]").forEach((el) => (el.textContent = currency));
}

export function currencyButtons() {
  const initial = getPreferredCurrency();
  document.querySelectorAll("[data-currency]").forEach((b) => b.classList.toggle("active", b.dataset.currency === initial));
  setCurrentCurrencyBadge(initial);
  document.querySelectorAll("[data-currency]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const currency = btn.dataset.currency;
      setPreferredCurrency(currency);
      document.dispatchEvent(new CustomEvent("currencychange", { detail: { currency } }));
      document.querySelectorAll("[data-currency]").forEach((b) => b.classList.toggle("active", b === btn));
    });
  });
}

export function formatMoney(amount, currency) {
  const value = Number(amount || 0);
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
  }
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function convertAmount(amount, fromCurrency, toCurrency, rates) {
  const value = Number(amount || 0);
  if (fromCurrency === toCurrency) return value;
  if (fromCurrency === "USD" && toCurrency === "INR") return value * Number(rates?.usdInr || 83);
  if (fromCurrency === "INR" && toCurrency === "USD") return value * Number(rates?.inrUsd || (1 / 83));
  return value;
}

export async function getFxRates(force = false) {
  const cached = !force ? loadJson(RATE_KEY) : null;
  const now = Date.now();
  if (cached && now - cached.savedAt < 10 * 60 * 1000) return cached.data;

  const fallback = { usdInr: 83, inrUsd: 1 / 83, source: "fallback" };
  try {
    const res = await fetch("/api/rates?base=USD", { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("rate request failed");
    const data = await res.json();
    const normalized = {
      usdInr: Number(data.usdInr || fallback.usdInr),
      inrUsd: Number(data.inrUsd || fallback.inrUsd),
      source: data.source || "api"
    };
    saveJson(RATE_KEY, { savedAt: now, data: normalized });
    return normalized;
  } catch (error) {
    console.warn("Using fallback FX rates:", error);
    return fallback;
  }
}

export function setSeoMeta({ title, description, path, image }) {
  document.title = title;
  const url = `${CONFIG.siteUrl}${path || location.pathname}`;
  const tags = {
    description,
    "og:title": title,
    "og:description": description,
    "og:url": url,
    "og:type": "website",
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": description
  };
  if (image) tags["og:image"] = image;
  Object.entries(tags).forEach(([name, content]) => {
    const selector = `meta[name="${name}"], meta[property="${name}"]`;
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
      if (name.startsWith("og:")) tag.setAttribute("property", name);
      else tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  });
}

export function escapeHtml(text = "") {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function toast(message, type = "success") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 250);
  }, 3000);
}

export function showLoading(container, text = "Loading...") {
  container.innerHTML = `<div class="loading">${escapeHtml(text)}</div>`;
}

function loadJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
