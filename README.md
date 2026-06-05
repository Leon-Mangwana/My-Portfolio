# Leon Mangwana — Portfolio

A modern, animated developer portfolio built with **Tailwind CSS** and vanilla JavaScript. No build step required — it opens straight in a browser.

## ✨ Highlights

- **Tailwind CSS** (latest, via Play CDN) + a CSS-variable theming layer
- **Animated aurora background**, mouse-follow spotlight and a moving grid
- **Glassmorphism** navbar and cards
- **Dark / light theme** toggle (remembers your choice)
- **Typed hero headline**, animated gradient text, scroll-reveal, animated counters
- **3D tilt** on skill & project cards, scrolling tech marquee, scroll-progress bar
- **Featured project layout** with Live Demo + Code links
- **Working contact form** (Formspree) with in-page sending + email fallback
- **Fully responsive**, accessible, reduced-motion aware, SEO + social-share ready

## 📁 Structure

```
portfolio/
├── index.html        ← markup + Tailwind config (inline)
├── css/styles.css    ← theming variables + custom components
├── js/main.js        ← all interactions
├── assets/
│   ├── leon.jpg                 ← YOUR PHOTO  (add this)
│   └── Leon_Mangwana_CV.pdf     ← YOUR RÉSUMÉ (add this)
└── README.md
```

## 🚀 Run it

Just **double-click `index.html`** — Tailwind loads from the CDN automatically.
For a local server (nicer for the form + fonts):

```powershell
python -m http.server 8000   # then open http://localhost:8000
```

## 📌 The two files you need to add

Put these in `assets/` with these exact names:
1. **`leon.jpg`** — your photo (a vertical/portrait crop looks best). If it's missing, the hero shows a clean "LM" placeholder instead of breaking.
2. **`Leon_Mangwana_CV.pdf`** — your résumé, for the download buttons.

> File names are case-sensitive once hosted online — keep them exactly as above.

## 📨 Make the contact form send real emails (free, ~2 min)

1. Sign up at **[formspree.io](https://formspree.io)** with `K2Leony@gmail.com`.
2. Create a form → copy its ID (looks like `xldggabc`).
3. In `index.html`, replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"`.

Until then, the form opens the visitor's email app as a fallback.

## 🌍 Publish it free

- **GitHub Pages**: push these files to a repo → Settings → Pages → deploy from `main`.
- Or drag the folder onto **netlify.com/drop**, or import on **vercel.com**.

> For best production performance you can later swap the Tailwind Play CDN for a real
> Tailwind build (`npm create vite@latest` + `tailwindcss`), but the CDN is perfect for shipping today.

## ✏️ Customise

- **Colours / gradient**: edit the CSS variables and `--grad` at the top of `css/styles.css`.
- **Typed roles**: edit the `roles` array in `js/main.js`.
- **Projects**: follow the comment above the project grid in `index.html` to add real repos, live links and screenshots — that's what wins interviews.

---
Built by Leon Mangwana · Computer Science · Midlands State University.
