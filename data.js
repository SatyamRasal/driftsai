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
  twitter: { handle: "@driftsai", url: "https://twitter.com/driftsai" },
  instagram: { handle: "@driftsai", url: "https://instagram.com/driftsai" },
  email: { handle: "contact@driftsai.com", url: "mailto:contact@driftsai.com?subject=Interested%20in%20buying" },
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
    id: "code-pilot-pro",
    name: "CodePilot Pro",
    tagline: "AI-powered code editor for Android",
    description: "CodePilot Pro is an AI-powered code editor that helps you write code faster. Features include syntax highlighting for 50+ languages, AI auto-completion, built-in terminal, Git integration, and a beautiful dark theme.\n\nPerfect for developers who want to code on the go. Works offline once installed.",
    category: "Developer Tools",
    developer: "DriftsAI",
    version: "2.1.0",
    fileType: "APK",
    fileSize: "24 MB",
    platform: ["Android"],
    downloadUrl: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE",
    icon: "https://img.icons8.com/3d-fluency/256/code.png",
    screenshots: [
      "https://placehold.co/400x700/1e2a5e/white?text=Screenshot+1",
      "https://placehold.co/400x700/4263eb/white?text=Screenshot+2",
      "https://placehold.co/400x700/10b981/white?text=Screenshot+3",
    ],
    features: [
      "AI code auto-completion",
      "50+ language syntax highlighting",
      "Built-in terminal",
      "Git integration",
      "Dark & light themes",
      "Works offline",
    ],
    requirements: ["Android 8.0+", "100 MB storage", "2 GB RAM"],
    whatsNew: "• Added Python 3.12 support\n• Fixed crash on large files\n• New AI suggestions engine",
    isFeatured: true,
    downloads: 12500,
    rating: 4.8,
  },

  // ── EXAMPLE APP 2 (delete this and add your own) ──
  {
    id: "shield-vpn",
    name: "ShieldVPN",
    tagline: "Fast & secure VPN for Windows",
    description: "ShieldVPN protects your privacy with military-grade encryption. One-click connect to 50+ countries. No logs, no tracking, no limits.\n\nFast enough for streaming and gaming. Lightweight — uses less than 30MB of RAM.",
    category: "Security",
    developer: "DriftsAI",
    version: "1.5.0",
    fileType: "EXE",
    fileSize: "18 MB",
    platform: ["Windows"],
    downloadUrl: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE",
    icon: "https://img.icons8.com/3d-fluency/256/shield.png",
    screenshots: [],
    features: [
      "One-click VPN connection",
      "50+ server locations",
      "Military-grade encryption",
      "No activity logs",
      "Kill switch",
      "Split tunneling",
    ],
    requirements: ["Windows 10/11", "50 MB storage"],
    whatsNew: "• Added 10 new server locations\n• 40% faster connection speed",
    isFeatured: true,
    downloads: 8300,
    rating: 4.5,
  },

  // ── EXAMPLE APP 3 ──
  {
    id: "pixel-studio",
    name: "Pixel Studio",
    tagline: "Create pixel art on your phone",
    description: "Pixel Studio is a full-featured pixel art editor. Create sprites, animations, and pixel art for your games or social media. Supports layers, onion skinning, and export to PNG/GIF.",
    category: "Design",
    developer: "DriftsAI",
    version: "3.0.1",
    fileType: "APK",
    fileSize: "12 MB",
    platform: ["Android", "iOS"],
    downloadUrl: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE",
    icon: "https://img.icons8.com/3d-fluency/256/paint-palette.png",
    screenshots: [],
    features: ["Layer support", "Animation timeline", "Export PNG/GIF", "128x128 canvas", "Custom palettes"],
    requirements: ["Android 7.0+ / iOS 14+", "50 MB storage"],
    whatsNew: "• New brush engine\n• Added animation export",
    isFeatured: false,
    downloads: 5600,
    rating: 4.7,
  },

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
