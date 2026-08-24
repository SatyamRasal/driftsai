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
  tagline: "Your Business. Simplified",
  description: "Vittam is a powerful, offline-first desktop application designed for freelancers, consultants, and agencies. It simplifies client management, invoice generation, time tracking, expense recording, and profit/loss reporting into one unified interface—eliminating recurring monthly SaaS subscription fees forever.",
  category: "Productivity",
  developer: "DriftsAI",
  version: "1.0.0",
  fileType: "EXE",
  fileSize: "80 MB",
  platform: [
    "Windows"
  ],
  downloadUrl: "https://drive.google.com/file/d/1na9VWAk_cC1FPw6ZyNBHfcuBwzGRJYAu/view?usp=sharing",
  icon: "https://driftsai.com/assets/vittam.png",
  screenshots: [
    "https://driftsai.com/assets/vittam_1.png",
    "https://driftsai.com/assets/vittam_2.png",
    "https://driftsai.com/assets/vittam_3.png",
    "https://driftsai.com/assets/vittam_4.png",
    "https://driftsai.com/assets/vittam_5.png"
  ],
  features: [
    "Instant professional invoice generation with custom branding",
    "Built-in time tracker to log billable hours directly to invoices",
    "Offline-first architecture for 100% data privacy and zero cloud dependency",
    "Comprehensive client management database",
    "Automated profit & loss, tax summary, and client revenue reporting",
    "Support for estimates, quotes, credit notes, and expense logging",
    "One-time payment model with lifetime access and zero subscription fees"
  ],
  requirements: [
    "Windows 10 or Windows 11 (64-bit)",
    "4 GB RAM minimum (8 GB recommended)",
    "200 MB free disk space",
    "Display resolution of 1280x800 or higher"
  ],
  whatsNew: "Initial public release of Vittam Desktop v1.0.0\n\nComplete invoice management engine supporting multi-currency billing\n\nIntegrated real-time hourly tracking to invoice conversion\n\nCustom expense classification and financial reporting tools",
  isFeatured: true,
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
