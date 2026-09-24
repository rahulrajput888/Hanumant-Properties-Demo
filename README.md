# Hanumant Properties — Website (6 pages)

Rohini, Delhi · Sale · Purchase · Renting · Loan Facility
**98713 14014 (Achal) · 84708 03854 (Deepak) · 92781 14024 (Desk)**

Ek multi-page website — pure HTML + CSS + JavaScript. Koi build step nahi, koi framework nahi,
koi internet dependency nahi (fonts bhi Google Fonts se, agar internet na ho to system font chalta hai).
`index.html` kholo, ban gayi.

---

## 📁 Files

```
index.html                 → Home (hero, featured 3 listings, services, process, EMI teaser, FAQ)
listings.html              → Saari 8 listings + search / filter / sort / detail popup / shortlist
services.html              → Sale-Purchase, Rentals, Plots-Kothies, Loan, Documentation
emi.html                   → Home-loan EMI calculator (sliders + donut + amortisation breakdown)
about.html                 → Office, kaam karne ka tareeka, stats, reviews
contact.html               → Phone / WhatsApp / hours, office visiting card, map, callback form
assets/
  css/site.css               → poora design system (colors, layout, animations, mobile rules)
  js/site.js                 → loader, page-transition, theme toggle, listings engine, EMI, form
  js/listings.js             → 8 demo listings ka data  ← sirf ye file badalni hai
  hero-exterior.jpg          → hero ka main photo
  locality.jpg               → "why us" + CTA band ka street photo
  listing-floor.jpg          → Listing 1  (3 BHK Builder Floor)
  listing-flat.jpg           → Listing 2  (2 BHK Flat, rent)
  listing-plot.jpg           → Listing 3  (Plot)
  listing-kothi.jpg          → Listing 4  (Kothi)
  listing-1bhk.jpg           → Listing 5  (1 BHK, rent)
  listing-floor-lift.jpg     → Listing 6  (Builder Floor with lift)
  listing-shop.jpg           → Listing 7  (Shop, rent)
  listing-kothi-floor.jpg    → Listing 8  (Kothi floor)
  about-office.jpg           → About page — office photo
  about-keys.jpg             → About page — keys / handover photo
  services-docs.jpg          → Services page — papers / documentation photo
  loan-desk.jpg              → EMI page — loan desk photo
README.md                  → ye file
```

> `assets/raw/` folder (bade original PNG) ZIP me nahi bheja gaya — sirf optimized JPEGs hain, isliye site halki aur fast hai.

## 🚀 Kaise chalayein

**Sabse aasan:** `index.html` par double-click karo — browser me khul jaayegi.

**Local server se (recommended, images aur fonts theek chalte hain):**

```bash
cd hanumant-properties       # jahan files hain
python3 -m http.server 8000
# browser me kholo: http://localhost:8000
```

Kisi bhi hosting (Hostinger, GoDaddy, Netlify, Vercel, GitHub Pages, cPanel) par bas
**saari files upload kar do** — kuch configure karne ki zarurat nahi.

## ✏️ Rozana kaam ki cheezein

| Kya badalna hai | Kahan |
|---|---|
| Naya property add / hatana | `assets/js/listings.js` — `window.HP_LISTINGS` array |
| Phone number | `assets/js/site.js` me `wa.me/919871314014` aur saari HTML files me `tel:+91...` |
| Address / timings | Footer + `contact.html` |
| Colors | `assets/css/site.css` sabse upar `:root{ }` tokens (`--accent`, `--paper`, `--ink`) |
| Photos | `assets/` me apni photo `listing-x.jpg` naam se daal do (same naam rakhna sabse aasan) |

**Listing ka format (ek example):**

```js
{
  id: "hp-01", title: "3 BHK Builder Floor, Sector-24", type: "floor", purpose: "sale",
  price: 16500000, locality: "Rohini Sector-24", area: 1350, areaUnit: "sq.ft",
  bedrooms: 3, bathrooms: 3, floor: "2nd of 4", facing: "East",
  features: ["Modular kitchen", "Stilt parking"], img: "assets/listing-floor.jpg"
}
```

- `price` sirf number likho (`16500000`) — site khud "₹1.65 Cr" bana degi.
- `purpose`: `"sale"` ya `"rent"` · `type`: `"floor" | "flat" | "plot" | "kothi" | "shop"`
- `order` 0,1,2… se home page par featured order tay hota hai.

## ✨ Website me kya-kya hai

- **Loading screen** — har page khulte waqt ~2 second ka animated loader (percent counter + brand mark).
- **Page-to-page transition** — kisi bhi internal link par ek wipe + page ka naam wala effect.
- **Home page** — animated hero (badalti hui words), floating tags, counting stats, featured listings,
  services grid, "why us" photo, 4-step process, EMI teaser, review carousel, FAQ.
- **Listings** — live search, purpose/type/locality/sort filter, chips, reset, detail popup, shortlist (browser me save), WhatsApp enquiry.
- **EMI calculator** — amount / rate / tenure sliders, monthly EMI, total interest, principal-vs-interest bars,
  WhatsApp par "Send me this plan" (jo bhi figure screen par hai, wahi WhatsApp message me jaata hai).
- **Shortlist** — dil (bookmark) icon dabao, `localStorage` me save hota hai, badge count header aur mobile bar me dikhta hai.
- **Callback form** — submit karte hi details WhatsApp par khul jaati hain (koi server/email setup nahi chahiye).
- **Light + Dark theme** — default **light**; top-right toggle se dark, choice browser me yaad rehti hai.
- **Mobile** — alag se optimize kiya gaya (chhoti screen ke liye sizes, spacing aur animation speed),
  bottom action bar (Home / Listings / Call / WhatsApp), swipe wali listings row, collapsible filter panel.
- Ek-ek cheez keyboard se bhi chalti hai (focus rings, Escape se popup band, skip-link).

## 🧪 Test kya hua

Chrome (headless) par 320 / 360 / 375 / 390 / 414 / 430 / 768 / 1024 / 1440 / 1680 px width par check kiya gaya:

- ✅ 6 pages — zero horizontal scroll, zero JavaScript error, zero missing image/404
- ✅ Loader sahi time par aata aur hat jaata hai; wipe transition link click par fire hota hai
- ✅ Home par 3 featured cards, listings page par 8 cards; filter/chip/sort/reset sab kaam karte hain
- ✅ Detail popup khulta + Escape se band; shortlist save hoke page change ke baad bhi rehta hai
- ✅ EMI ke saare figure input badalte hi update hote hain; bars scale karti hain
- ✅ Light + dark dono theme me layout theek; theme choice dobara khulte par yaad rehti hai

## 🛡️ Robustness (jo cheezein ab galti-proof hain)

- **Critical CSS inline hai** — `site.css` load na ho, ruk jaaye, ya browser me purani cached copy ho,
  tab bhi header, listings cards, contact ki "Call us / WhatsApp / Office hours" strip aur icons theek dikhte hain.
- **Har inline SVG ka apna width/height attribute hai** — CSS na mile to bhi koi icon bada (giant) ho kar
  layout nahi tod sakta.
- **Cache-busting** — `site.css?v=7`, `site.js?v=7` — purani cached file kabhi purana layout nahi dikhayegi.
  (CSS/JS me koi badlaav karo to `?v=` ka number badha dena — bas.)
- **Loader failsafe** — agar `site.js` load hi na ho, to loader 3.6 second me khud hat jaata hai; page kabhi block nahi hota.
- **JavaScript off ho to bhi** page ka content padhne layak rehta hai (loader apne aap chhup jaata hai).

## ⚠️ Demo content ki note

Listings, prices, area, "120+ deals", reviews aur counters **demo placeholder** hain taaki site ki
capability dikh sake. Live karne se pehle real photos, real prices aur real reviews se replace kar lena
(`assets/js/listings.js` + us page ka text). Address, hours, Google Maps listing aur teen phone numbers
client ke diye hue hi hain.

---
© Hanumant Properties, Rohini, Delhi. Website demo.
