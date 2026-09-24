/* ==========================================================================
   HANUMANT PROPERTIES — listing data (demo)
   To go live: replace the objects below with your real inventory.
   img  → path inside /assets,  alt → image description for accessibility
   ========================================================================== */
window.HP_LISTINGS = [
  {
    id: "hp-01", title: "3 BHK Builder Floor with Terrace Rights", type: "floor",
    purpose: "sale", price: 16500000, unit: "", locality: "Rohini Sector-24",
    area: 1350, areaUnit: "sq.ft", bedrooms: 3, bathrooms: 3, floor: "2nd of 3 floors",
    facing: "East", age: "4 years",
    features: ["Terrace rights", "Covered parking", "Modular kitchen", "24-hour water supply"],
    img: "assets/listing-floor.jpg", imgAlt: "Bright living room of a 3 BHK builder floor in Rohini Sector-24",
    alt: "Bright living room of a 3 BHK builder floor in Rohini Sector-24",
    notes: "Corner-adjacent floor on a 30-ft road, walkable to Vikas Bharti Public School and the Sector-24 market. Registered and ready for immediate transfer."
  },
  {
    id: "hp-02", title: "2 BHK Semi-Furnished Flat", type: "flat",
    purpose: "rent", price: 28000, unit: "/mo", locality: "Rohini Sector-9",
    area: 950, areaUnit: "sq.ft", bedrooms: 2, bathrooms: 2, floor: "4th of 6 floors",
    facing: "North-East", age: "9 years",
    features: ["Lift + power backup", "Semi-furnished", "Covered parking", "Gated society"],
    img: "assets/listing-flat.jpg", alt: "Semi-furnished 2 BHK apartment living room in Rohini Sector-9",
    notes: "Well-maintained society block with park view, close to metro feeder route and schools. Family tenants preferred."
  },
  {
    id: "hp-03", title: "Residential Plot, 200 sq.yd Corner", type: "plot",
    purpose: "sale", price: 21000000, unit: "", locality: "Rohini Sector-22",
    area: 200, areaUnit: "sq.yd", bedrooms: 0, bathrooms: 0, floor: "Freehold plot",
    facing: "South", age: "—",
    features: ["Corner plot", "Freehold", "40-ft road front", "Construction allowed"],
    img: "assets/listing-plot.jpg", alt: "Empty residential plot with boundary wall in Rohini Sector-22",
    notes: "Clear title with clean chain of documents. Ideal for a self-built kothi or an investor looking to hold in a developed pocket."
  },
  {
    id: "hp-04", title: "4 BHK Kothi with Lawn &amp; Servant Quarter", type: "kothi",
    purpose: "sale", price: 45000000, unit: "", locality: "Prashant Vihar",
    area: 3200, areaUnit: "sq.ft", bedrooms: 4, bathrooms: 5, floor: "Ground + 2",
    facing: "West", age: "11 years",
    features: ["Front lawn", "Car porch for 2", "Servant quarter", "Vaastu aligned"],
    img: "assets/listing-kothi.jpg", alt: "Independent kothi with front lawn in Prashant Vihar, Delhi",
    notes: "A rare independent kothi on a quiet inner street. Suited to a large family or a businessman wanting space for a home office."
  },
  {
    id: "hp-05", title: "1 BHK Flat, Ideal First Rental", type: "flat",
    purpose: "rent", price: 16500, unit: "/mo", locality: "Rohini Sector-7",
    area: 620, areaUnit: "sq.ft", bedrooms: 1, bathrooms: 1, floor: "1st of 4 floors",
    facing: "East", age: "14 years",
    features: ["Fresh paint", "Independent entry", "Two-wheeler parking", "Close to metro"],
    img: "assets/listing-1bhk.jpg", alt: "Compact bright 1 BHK apartment in Rohini Sector-7",
    notes: "Budget-friendly and well connected — a good fit for working professionals or a small family shifting into Delhi."
  },
  {
    id: "hp-06", title: "3 BHK Builder Floor with Lift", type: "floor",
    purpose: "sale", price: 14200000, unit: "", locality: "Rohini Sector-14",
    area: 1200, areaUnit: "sq.ft", bedrooms: 3, bathrooms: 2, floor: "1st of 4 floors",
    facing: "North", age: "2 years",
    features: ["Private lift", "Stilt parking", "Prime location", "Modular fittings"],
    img: "assets/listing-floor-lift.jpg", alt: "Newly built builder floor with private lift in Rohini Sector-14",
    notes: "Newly built floor with quality fittings, minutes from the district centre and metro station. Seller open to a reasonable negotiation."
  },
  {
    id: "hp-07", title: "Ground Floor Shop, Main Market Road", type: "shop",
    purpose: "rent", price: 45000, unit: "/mo", locality: "Rohini Sector-24",
    area: 480, areaUnit: "sq.ft", bedrooms: 0, bathrooms: 1, floor: "Ground floor",
    facing: "Main road", age: "6 years",
    features: ["High footfall", "Shutter + glass front", "Washroom", "Mezzanine storage"],
    img: "assets/listing-shop.jpg", alt: "Empty retail shop space on a market road in Rohini Sector-24",
    notes: "Suits retail, clinic or food service. Long lease preferred; escalation terms discussed during negotiation."
  },
  {
    id: "hp-08", title: "Independent Kothi Floor with Balcony", type: "kothi",
    purpose: "sale", price: 19500000, unit: "", locality: "Rohini Sector-21",
    area: 1800, areaUnit: "sq.ft", bedrooms: 3, bathrooms: 3, floor: "1st floor of kothi",
    facing: "South-East", age: "8 years",
    features: ["Full-floor privacy", "Two balconies", "Store room", "Peaceful street"],
    img: "assets/listing-kothi-floor.jpg", alt: "First-floor balcony of a kothi in Rohini Sector-21",
    notes: "Owners retain the ground floor and are happy with a like-minded family above. Society park at walking distance."
  }
];
window.HP_LISTINGS.forEach(function (l, i) { l.order = i; });
