# Leon Mangwana — Portfolio Website

A fast, modern, fully responsive personal portfolio built with **vanilla HTML, CSS and JavaScript** — no frameworks, no build step. Just open it in a browser.

## ✨ Features

- **Single-page design** with smooth-scroll navigation: Home · About · Skills · Projects · Recognition · Contact
- **Dark / light theme** toggle (remembers your choice) — teal → indigo brand palette
- **Animated hero** with a typing effect and your photo
- **Featured project layout** with Live Demo + View Code links, ready for real repos
- **Recognition section** — achievement highlights and reference testimonials
- **Working contact form** (Formspree) with in-page sending + graceful email fallback
- **Scroll-reveal animations**, animated stat counters, scroll progress bar and active-section highlighting
- **Mobile-first responsive** layout with a slide-in menu
- **SEO + social-share ready** (meta tags, Open Graph image)
- **Accessible**: keyboard-friendly, reduced-motion aware, semantic HTML

## 📁 Structure

```
portfolio/
├── index.html          ← the page content
├── css/styles.css      ← all styling + theming
├── js/main.js          ← interactions
├── assets/
│   ├── leon.jpg                 ← YOUR PHOTO  (add this)
│   └── Leon_Mangwana_CV.pdf     ← YOUR CV     (add this)
└── README.md
```

## 🚀 How to use

1. **Add your two files** to the `assets/` folder (see `assets/README.txt`):
   - `leon.jpg` — your professional photo
   - `Leon_Mangwana_CV.pdf` — your CV
2. **Preview locally** — just double-click `index.html`, or run a tiny server:
   ```powershell
   # from the portfolio folder
   python -m http.server 8000
   # then open http://localhost:8000
   ```

## 🌍 Publish it for free (recommended: GitHub Pages)

1. Create a new GitHub repo, e.g. `portfolio`.
2. Upload all these files (including the `assets` folder with your photo + CV).
3. Repo **Settings → Pages → Build from branch → `main` / root → Save**.
4. Your site goes live at `https://leon-mangwana.github.io/portfolio/`.

> Alternatives: drag-and-drop the folder onto **netlify.com/drop**, or import the repo on **vercel.com** — both give a free live URL in seconds.

## 📨 Make the contact form send real emails (free, ~2 min)

By default the form opens the visitor's email app. To receive messages in-page:

1. Sign up at **[formspree.io](https://formspree.io)** using `K2Leony@gmail.com`.
2. Create a form → copy the form ID (looks like `xyzabcd`).
3. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and replace `YOUR_FORM_ID`.

That's it — submissions now land in your inbox without leaving the page.

## ✏️ Easy things to customise

- **Colours**: edit `--accent` / `--accent-2` at the top of `css/styles.css` (currently teal → indigo).
- **Typing roles**: edit the `roles` array in `js/main.js`.
- **Projects**: as you build real GitHub projects, update the `#projects` cards in `index.html` with live demo + repo links — that's what impresses hiring managers most. The first card is marked `project--featured`; follow the comment above the grid to add more.
- **Project screenshots**: drop an image in `assets/` and swap the emoji in `.project__thumb` for `<img src="assets/your-shot.png" alt="…">`.

---
Built for Leon Mangwana · BSc (Hons) Computer Science, Midlands State University.
