# DriftsAI — Software Distribution Platform

**No database. No backend. No build step. Just HTML + Google Drive.**

---

## ⚡ 2-Minute Setup

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "DriftsAI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/driftsai.git
git push -u origin main
```

### Step 2 — Deploy on Netlify
1. Go to **[app.netlify.com](https://app.netlify.com)** → Sign up with GitHub
2. Click **Add new site** → **Import from Git** → Pick your repo
3. Leave everything default → Click **Deploy**
4. Done! Your site is live in 30 seconds 🎉

**No environment variables needed. No database. Nothing to configure.**

---

## 📱 How to Add Apps

### Option A — Use the Admin Panel
1. Go to `yoursite.netlify.app/admin.html`
2. Login with: `admin@driftsai.com` / `driftsai2024`
3. Fill in the app form → Click **Generate Code**
4. Copy the generated code
5. Open `data.js` in your repo → Paste inside the `APPS` array
6. Commit & push → Netlify deploys in 30 seconds

### Option B — Edit data.js directly
Open `data.js` → Copy one of the example apps → Change the values → Push.

---

## 📂 Hosting Files on Google Drive

1. Upload your APK/EXE/DMG to **Google Drive**
2. Right-click the file → **Share** → **Anyone with the link**
3. Copy the link. It looks like:
   ```
   https://drive.google.com/file/d/1ABC123xyz/view
   ```
4. Take the ID part (`1ABC123xyz`) and make this URL:
   ```
   https://drive.google.com/uc?export=download&id=1ABC123xyz
   ```
5. Use this URL as the `downloadUrl` in your app data

**For app icons/screenshots:** Same process, or use [imgur.com](https://imgur.com) or [postimages.org](https://postimages.org)

---

## ✏️ Change Your Social Links

Open `data.js` and edit the `SOCIAL` object at the top:
```javascript
const SOCIAL = {
  twitter: { handle: "@yourhandle", url: "https://twitter.com/yourhandle" },
  instagram: { handle: "@yourhandle", url: "https://instagram.com/yourhandle" },
  email: { handle: "you@email.com", url: "mailto:you@email.com" },
};
```

## 🔑 Change Admin Password

Open `data.js` and edit:
```javascript
const ADMIN_EMAIL = "your@email.com";
const ADMIN_PASSWORD = "your-new-password";
```

---

## 📁 Project Structure

```
driftsai/
├── index.html      ← Homepage (featured, categories, apps)
├── apps.html       ← All apps with search & filters
├── app.html        ← Single app page + download + contact
├── admin.html      ← Admin panel (login + app form)
├── style.css       ← All styles
├── data.js         ← ALL YOUR DATA (apps, social links, admin login)
├── robots.txt      ← SEO
└── README.md
```

**Total: 7 files. That's it.**

---

## 🌐 Custom Domain

In Netlify → **Domain management** → **Add custom domain** → Follow DNS instructions → Free HTTPS included.

---

## ❓ FAQ

**Q: Where is my data stored?**
In `data.js`. It's just a JavaScript file. No database.

**Q: How do users download?**
They click Download → file opens from Google Drive directly.

**Q: Can anyone edit my apps?**
No. They'd need to push to your GitHub repo. The admin panel just helps you generate the code.

**Q: Is it fast?**
Yes. Zero API calls, zero database queries. Pure static files served from Netlify's CDN worldwide.
