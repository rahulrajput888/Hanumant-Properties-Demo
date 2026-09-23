# Hanumant Properties — Website

Rohini, Delhi · Sale · Purchase · Renting · Loan Facility
**98713 14014 · 92781 14024**

Ek single-page website — HTML, CSS aur JavaScript sab ek hi file (`index.html`) me hai.
Koi build step, koi framework, koi dependency nahi. Bas file kholo, chal jaayegi.

---

## 📁 Files

```
index.html                 → poori website (HTML + CSS + JS isi me)
assets/                    → website ki images (JPEG, optimized)
  hero-exterior.jpg          - hero section ka main photo
  locality.jpg               - "why us" + CTA band ka street photo
  listing-floor.jpg          - Listing 1  (3 BHK Builder Floor)
  listing-flat.jpg           - Listing 2  (2 BHK Flat, rent)
  listing-plot.jpg           - Listing 3  (Plot)
  listing-kothi.jpg          - Listing 4  (Kothi)
  listing-1bhk.jpg           - Listing 5  (1 BHK, rent)
  listing-floor-lift.jpg     - Listing 6  (Builder Floor with lift)
  listing-shop.jpg           - Listing 7  (Shop, rent)
  listing-kothi-floor.jpg    - Listing 8  (Kothi floor)
README.md                  → ye file
```

## 🚀 Kaise chalayein

- **Local:** `index.html` par double-click → browser me khul jaayegi.
- **Hosting:** `index.html` + `assets/` folder ko apne hosting par upload kar do
  (Hostinger, GoDaddy, Netlify, Vercel, GitHub Pages — kuch bhi chalega).
  Images relative path se aati hain, isliye folder structure same rakhna.

## ✏️ Kya-kya edit kar sakte ho

| Kya badalna hai | Kahan |
|---|---|
| Phone / WhatsApp number | `index.html` me `tel:+919871314014` aur `wa.me/919871314014` — find & replace |
| Property listings | `LISTINGS = [ ... ]` array (script ke andar) — title, price, area, features, image |
| Listing ki image | `img: "assets/listing-xxx.jpg"` line badal do |
| Stats (650+ deals etc.) | `data-count="650"` attribute |
| Testimonials | `#reviews` section ke `.quote` blocks |
| FAQ | `#faq` section ke `.faq` blocks |
| Google Maps link | `place_id:ChIJ0cg0BsgGDTkRtoCSKuUtm_A` wale saare links |

Dhyan rahe: listings, stats aur testimonials **demo content** hain — live karne se
pehle apna real data daal dena.

## ✅ Website me kya-kya hai

- **Hero** — animated headline, rotating keyword, real photo card, live counters
- **Listings** — filter (purpose / type / locality / keyword), sort, shortlist save
  (browser me yaad rehti hai), details modal, 1-tap WhatsApp enquiry per property
- **Services** — sale-purchase, renting, plots & kothies, loan, documentation, investment
- **EMI Calculator** — loan amount / rate / tenure sliders, principal vs interest split
- **How it works** — 4-step animated process rail
- **Reviews** — swipeable carousel (mobile pe counter ke saath)
- **FAQ** — accordion
- **Contact** — enquiry form jo details WhatsApp par bhej deta hai, stylised locality map
- **Mobile build** — fixed bottom bar (Call · Directions · Enquiry), drawer menu,
  swipe carousels, collapsible filters, bottom-sheet modal
- **Light mode default** + dark mode toggle (choice browser me save hoti hai)
- SEO meta, Open Graph, favicon, keyboard + screen-reader friendly, reduced-motion support

## 📞 Office

Flat No. 145, Pocket-14, Sector-24, Near Vikas Bharti Public School,
Rohini, Delhi-110085 · Mon–Sun 10:00 AM – 8:00 PM

---

### Note
Website ki images demo ke liye AI se generate ki gayi hain (real property photos nahi).
Client ki original photos use nahi ki gayi hain — jab chaaho apni real photos
`assets/` folder me same naam se replace kar do, layout khud adjust ho jaayega.
