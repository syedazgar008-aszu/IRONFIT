# IronFit Public Website — Run Instructions

A React (Vite) site: Home, About, Classes, Membership plans, Trainers,
Gallery, Reviews, Booking, Contact (Maps + WhatsApp/Call).

## Requirements
Node.js v18+ — check with `node -v`. Get it from https://nodejs.org if missing.

## Run it
```
npm install
npm run dev
```
Opens at `http://localhost:5500`.

## Connect to your backend
Open `src/api.js`, replace:
```js
export const API_BASE_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```
with your deployed Google Apps Script Web App URL (same one the admin
dashboard uses). Until you do, the site runs in **demo mode** with sample
plans/trainers/classes/gallery/reviews so you can preview the design.

## What's wired to the backend
- Membership plans, trainers, classes, gallery, approved reviews — pulled live
- Booking form → `createBooking`
- Contact/enquiry form → `createEnquiry`
- "Leave a Review" form → `submitReview` (shows publicly only after admin approves it in the dashboard)

## Before going live
- `src/components/Contact.jsx` uses a generic Google Maps embed — put your
  real embed URL in the `mapsEmbedUrl` field on the **Settings** tab of the
  admin dashboard (or directly in the `Settings` sheet tab) once your gym's
  location is ready; it's pulled automatically.
- Phone/WhatsApp numbers also come from the `Settings` sheet (`phone`, `whatsapp`).
- Hero/About/Gallery use placeholder Unsplash photos — swap the image URLs
  for your own gym's photos when ready (in `Hero.jsx`, `AboutFeatures.jsx`,
  demo arrays in `Classes.jsx`/`Trainers.jsx`/`Gallery.jsx`, or just add real
  entries via the admin dashboard).

## Build for hosting
```
npm run build
```
Produces a `dist/` folder — upload to Netlify, Vercel, GitHub Pages, or any
static host.
