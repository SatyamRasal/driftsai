// ═══════════════════════════════════════════════════
//  DRIFTSAI — ALL YOUR DATA LIVES HERE
//  Edit this file to add/remove/update your apps
//  Then push to GitHub → Netlify auto-deploys in 30s
// ═══════════════════════════════════════════════════

// ── YOUR ADMIN LOGIN (change these!) ──
const ADMIN_EMAIL = "admin@driftsai.com";
const ADMIN_PASSWORD = "driftsai2024";

// ── YOUR SOCIAL LINKS ──
const SOCIAL = {
  twitter: { handle: "@driftsai", url: "https://twitter.com/drifts_ai" },
  instagram: { handle: "@driftsai", url: "https://instagram.com/drifts_ai" },
  email: { handle: "satyamrasal13499@gmail.com", url: "mailto:atyamrasal13499@gmail.com?subject=Interested%20in%20buying" },
};

// ── YOUR SITE INFO ──
const SITE = {
  name: "DriftsAI",
  tagline: "Free Software Downloads",
  description: "Download free APK, EXE, DMG files. No account needed.",
};

// ═══════════════════════════════════════════════════
//  APPS — Add your apps here
//
//  HOW TO GET GOOGLE DRIVE DOWNLOAD LINK:
//  1. Upload file to Google Drive
//  2. Right-click → Share → "Anyone with the link"
//  3. Copy the link, it looks like:
//     https://drive.google.com/file/d/XXXXX/view
//  4. Take the XXXXX part (the file ID)
//  5. Make the download URL:
//     https://drive.google.com/uc?export=download&id=XXXXX
//
//  HOW TO GET ICON/IMAGE URL:
//  Same process — upload image to Google Drive
//  Or use https://imgur.com (free image hosting)
//  Or use https://postimages.org
// ═══════════════════════════════════════════════════

const APPS = [
  // ── EXAMPLE APP 1 (delete this and add your own) ──
  {

  id: "vittam",
  name: "Vittam",
  tagline: "invoice. Simplified.",
  description: "",
  category: "AI Tools",
  developer: "DriftsAI",
  version: "1.0.0",
  fileType: "APK",
  fileSize: "",
  platform: [],
  downloadUrl: "",
  icon: "",
  screenshots: [],
  features: [],
  requirements: [],
  whatsNew: "",
  isFeatured: false,
  downloads: 0,
  rating: 0
}
  // ── ADD MORE APPS BELOW ──
  // Copy the template above, change the values, and paste here.
  // Then push to GitHub and Netlify deploys automatically.
];

// ═══════════════════════════════════════════════════
//  CATEGORIES — shown on homepage
// ═══════════════════════════════════════════════════
const CATEGORIES = [
  { id: "AI Tools", icon: "🤖", color: "#8b5cf6" },
  { id: "Developer Tools", icon: "⚡", color: "#3b82f6" },
  { id: "Productivity", icon: "🚀", color: "#10b981" },
  { id: "Design", icon: "🎨", color: "#ec4899" },
  { id: "Security", icon: "🛡️", color: "#f59e0b" },
  { id: "Games", icon: "🎮", color: "#6366f1" },
  { id: "Utilities", icon: "🔧", color: "#64748b" },
  { id: "Entertainment", icon: "🎬", color: "#ef4444" },
];
