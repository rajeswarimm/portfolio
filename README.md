# Rajeswari MM — Portfolio

A React + Tailwind CSS + GSAP portfolio for a React Frontend Developer.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Stack

- React 18 + Vite
- Tailwind CSS (utility classes) + per-component CSS files for custom
  effects (carousel, timeline, nav)
- GSAP for entrance/reveal animations only — no heavy animation on every
  element
- `react-icons` for icons

## Structure

```
src/
├── components/
│   ├── Navbar/    Sticky nav, active-section highlight, mobile menu
│   ├── Home/      Hero with entrance animation
│   ├── About/     Bio + experience timeline
│   ├── Projects/  Seamless infinite drag carousel (no arrows)
│   ├── Skills/    Tabbed skills (Frontend/Backend/Database/Testing/Tools)
│   └── Contact/   Email / phone / WhatsApp / LinkedIn cards
├── data/          Content kept separate from UI (experience, projects, skills)
├── App.jsx
├── App.css
└── main.jsx
```

## Notes

- Colors are limited to `#E75A71` (accent) and white/black, per the brief.
- Fonts: "Fraunces" (display) + "Manrope" (body), loaded from Google Fonts
  in `App.css` — an internet connection is needed the first time a browser
  loads the page for these to render (falls back to serif/sans-serif
  otherwise).
- The project carousel auto-scrolls continuously, pauses while
  dragged/swiped, and resumes shortly after. It has no visible seam because
  the project list is rendered twice and the offset wraps with modulo math.
- Animations respect `prefers-reduced-motion`.
