# 🌿 ABHAY'S ROOF GARDEN — FRONTEND MARKETPLACE ARCHITECTURE & BUILD SPECIFICATION

> **DOCUMENT PURPOSE:**  
> This specification is the single source of truth for generating the entire frontend for **Abhay's Roof Garden Collective**.  
> It is structured so that you can copy each section's **"Vercel / v0 AI Prompt"** directly into [v0.app](https://v0.app) or an AI coding assistant to generate pixel-perfect, production-grade Next.js pages without confusion.


## 🎯 1. CORE ARCHITECTURAL CONSTRAINTS

1. **100% FRONTEND & CLIENT-DEMO READY:**
   * **Strictly frontend:** All interactions (Cart, Wishlist, Checkout, Seller Application, Order Tracking) operate via client-side state, React hooks, and `localStorage`.
   * No backend, database, or payment gateway account required for this phase.
   * All data (products, nurseries, customer reviews, order states) is served from realistic mock datasets.

2. **DESIGN SYSTEM & AESTHETIC CONTINUITY:**
   * **Palette:**
     * Primary Forest Greens: `#1A3325`, `#0F291E`
     * Soft Cream Backgrounds: `#F9F8F6`, `#F7F3EA`, `var(--background)`
     * Warm Terracotta & Earth Accents: `#C86D51`, `#A0522D`
     * Gentle Borders & Dividers: `#E3E8E4`, `rgba(26, 51, 37, 0.08)`
   * **Typography:**
     * Headings: `font-serif` (Fraunces — botanical, warm, editorial serif)
     * Body & UI: `font-sans` (Inter — clean, legible, modern)
     * Numbers / Tags / Serial Numbers: `font-mono` (e.g. `NO. 014`)
   * **Container & Layout Standards:**
     * Ultra-wide layout container: `mx-auto w-full max-w-[100rem]`
     * Fluid horizontal padding across all viewports: `px-4 sm:px-6 lg:px-10 xl:px-14`
     * Smooth rounded aesthetics: `rounded-2xl sm:rounded-3xl`
     * Micro-animations: `transition-all duration-300 ease-out`
     * **Strict Mobile Responsiveness:** Zero horizontal scrollbars (`overflow-x-hidden`), touch targets $\ge$ 44px, sticky action bars on mobile for cart/checkout.

3. **THE MARKETPLACE MODEL (Multi-Vendor Nursery Collective):**
   * The platform is a **curated botanical marketplace**.
   * Products are grown and fulfilled by **Abhay's Flagship Nursery** and **Verified Local Partner Nurseries** (e.g., *Eden Rooftop Garden, Bengal Bonsai Studio, Salt Lake Succulents*).
   * Every product card and detail page highlights:
     * **Grower Name & Location** (e.g., *"Grown by Eden Green Nursery • South Kolkata"*).
     * **Local Delivery Speed** (e.g., *"Fast Local Delivery in 24-48 hrs"*).
     * **Nursery Quality Badge** (e.g., *"Verified Organic Grower"*).

---

## 🔄 2. UPDATES REQUIRED FOR EXISTING FILES

Before building new pages, update these foundational files so all pages share state and data seamlessly.

### Update 1: `src/components/store/products.ts` (Data Model)
Add Nursery / Seller information, rich specifications, and pot options to the product type:
```typescript
export type Nursery = {
  id: string
  slug: string
  name: string
  tagline: string
  location: string
  distanceKm?: number
  rating: number
  reviewsCount: number
  image: string
  avatar: string
  verified: boolean
  specialty: string
  bio: string
}

export type Product = {
  id: string
  slug: string
  tag: string
  name: string
  botanical: string
  description: string
  careSummary: {
    light: 'Low light' | 'Bright indirect' | 'Full sun'
    water: string // e.g. "Once a week"
    difficulty: 1 | 2 | 3 // 1: Easy, 2: Moderate, 3: Expert
    petFriendly: boolean
    airPurifying: boolean
  }
  image: string
  gallery: string[]
  rating: number
  reviews: number
  badge?: string
  sizes: { label: 'S' | 'M' | 'L'; price: number; mrp?: number; height: string }[]
  pots: { id: string; name: string; price: number; image: string }[]
  filters: ('all' | 'beginner' | 'low-light' | 'pet-friendly' | 'flowering' | 'succulents' | 'air-purifier')[]
  nursery: Nursery
  inStock: boolean
}
```

### Update 2: `src/lib/store/cart-store.ts` (Full Persistent Cart Engine)
Replace the simple single-number counter in `cart-context.tsx` with a persistent Zustand store (`zustand/middleware` with `localStorage`):
* Stores items with: `productId`, `productName`, `size`, `pot`, `price`, `quantity`, `image`, `nurseryName`.
* Actions: `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`, `toggleCart()`.
* Computed: `totalItemsCount`, `subtotalPrice`, `shippingFee` (Free over ₹999).

### Update 3: `src/components/store/layout/site-header.tsx`
* Change navigation links from `#` to real routes:
  * `Shop All` $\rightarrow$ `/shop`
  * `Nurseries` $\rightarrow$ `/nurseries`
  * `Plant Finder Quiz` $\rightarrow$ `/#plant-finder`
  * `Sell With Us` $\rightarrow$ `/sell` (Styled as a warm badge or pill button)
* Wire up Cart Icon to toggle the `<CartDrawer />`.
* Wire up Search input to redirect to `/shop?q=searchTerm`.

---

## 📄 3. COMPLETE PAGE-BY-PAGE SPECIFICATION & VERCEL / V0 PROMPTS

---

### Page 1: Dynamic Product Detail Page (PDP)
* **Route:** `/shop/[slug]` (or `/product/[id]`)
* **Purpose:** High-converting botanical product page with size switcher, planter upgrade, plant care scorecard, and marketplace seller box.

#### Key Features:
1. **Interactive Gallery:** Large high-res featured plant image + clickable thumbnail slider.
2. **Product Title & Botanical Name:** `Fraunces` heading + italic botanical name (`Spathiphyllum wallisii`).
3. **Marketplace Seller Box (`<NurseryTrustBox />`):**
   * *“Grown & Shipped by [Nursery Name]”* with verified leaf icon.
   * Seller rating (e.g. `★ 4.9 (120+ orders)`), location (`Ballygunge, Kolkata - 4.2 km away`), and a link to `View Nursery Storefront`.
4. **Interactive Size Selector:** Chips for `S (6" pot)`, `M (8" pot - Most Popular)`, `L (10" pot)` that dynamically update price and MRP.
5. **Planter Upgrade Selector:** Radio tiles:
   * Standard Eco Nursery Pot (+₹0)
   * Handcrafted White Ceramic Pot (+₹299)
   * Breathable Terracotta Planter (+₹199)
6. **Live Sticky Add-to-Cart Bar (Mobile & Desktop):**
   * Quantity selector (`-` `1` `+`), "Add to Cart" button (triggers Cart Drawer), and Wishlist Heart.
7. **Plant Vitality Dashboard (4 Feature Cards):**
   * Sunlight level, Watering schedule, Difficulty gauge, Pet safety badge.
8. **7-Day Healthy Plant Guarantee Card:** Assurance badge with 1-click WhatsApp support replacement info.
9. **Customer Reviews with Photos & Verified Buyer Badges.**
10. **"More from this Nursery" & "Frequently Bought Together" Carousel.**

> #### 📋 Vercel / v0 AI Prompt for Page 1:
> ```text
> Create a responsive, luxury e-commerce Product Detail Page (PDP) for Next.js 16 (App Router) and Tailwind CSS v4 in TypeScript.
> Brand Aesthetic: "Abhay's Roof Garden" - earthy botanical colors (Deep Forest #1A3325, #0F291E, Soft Cream #F9F8F6, Terracotta accents), fonts 'Fraunces' (serif headings) and 'Inter' (sans body).
> 
> The page must include:
> 1. Breadcrumbs: Home > Shop > Category > Plant Name.
> 2. Two-column grid on desktop (max-w-[100rem], px-4 sm:px-6 lg:px-10 xl:px-14):
>    - Left: Multi-image thumbnail gallery with image zoom-on-hover and 4 thumbnail selector buttons.
>    - Right: Plant title (Fraunces), botanical italic subtitle, star rating with review count, price in INR (e.g., ₹649 with slashed MRP ₹899 and "28% OFF" badge).
> 3. MARKETPLACE SELLER BOX: A stylish card showing "Grown by Eden Green Rooftop Nursery", "Verified Local Grower" green check, rating (4.9/5), location badge ("South Kolkata • 3.5 km away"), and a secondary button "Visit Nursery".
> 4. Interactive Size Selector (S, M, L) that updates price dynamically.
> 5. Planter Upgrade Option: Choice between "Standard Nursery Pot (+₹0)", "Minimalist Ceramic Pot (+₹299)", and "Terracotta Pot (+₹199)".
> 6. Action Row: Quantity stepper, big green "Add to Plant Bag" button that integrates with our cart store, and Wishlist toggle button.
> 7. Care Scorecard Grid (4 boxes): Light requirement (Sun icon), Water frequency (Droplets icon), Care level (Leaf icon), Pet Friendly (Shield icon).
> 8. Guarantees: "7-Day Transit Health Guarantee" with WhatsApp replacement guarantee card.
> 9. Bottom Sections: Detailed tabs (Plant Description, Care Guide, Unboxing Video/Guide), Customer Photo Reviews with star breakdown, and a "More from this Nursery" carousel.
> Ensure 100% responsiveness on mobile with a sticky bottom Add-to-Cart bar.
> ```

---

### Page 2: Slide-Over Cart Drawer (`<CartDrawer />`) & Full Cart Page (`/cart`)
* **Route:** Slide-over modal across all pages + dedicated `/cart` route
* **Purpose:** Seamless shopping bag review with nursery-grouped items, free shipping meter, and instant checkout link.

#### Key Features:
1. **Slide-Over Animation:** Slides smoothly from the right side of the screen with a backdrop blur.
2. **Free Delivery Progress Bar:** *"Add ₹240 more to unlock Free Eco-Packaging & Delivery!"* (Calculates dynamically based on subtotal $\ge$ ₹999).
3. **Multi-Vendor Item Grouping:**
   * Items grouped by the nursery that grows them (e.g. *Shipment 1: Abhay's Flagship Nursery*, *Shipment 2: Eden Green Nursery*).
4. **Item Card Details:** Plant thumbnail, name, selected size (e.g. `Size: M`), selected pot (`Pot: Terracotta`), unit price, quantity stepper, and remove button (`Trash2`).
5. **Promo Code Input:** Mock coupon box supporting codes like `ROOFTOP10` (10% off) or `FIRSTPLANT` (₹100 off) with instant green success feedback.
6. **Order Financial Summary:**
   * Subtotal
   * Nursery Safe-Transit Packaging (Free)
   * Estimated Shipping (₹0 if $\ge$ ₹999, else ₹99)
   * Grand Total (INR)
7. **Proceed to Checkout Button:** Prominent green CTA with lock icon ("100% Safe Checkout").

> #### 📋 Vercel / v0 AI Prompt for Page 2:
> ```text
> Build an interactive Slide-over Cart Drawer component and full '/cart' page for a botanical Next.js 16 e-commerce store with Tailwind CSS v4 and TypeScript.
> Use client-side state (Zustand or React state) with realistic mock items.
> 
> Features:
> 1. Header with "Your Plant Bag (X items)" and a close 'X' button.
> 2. Free Delivery Progress Bar: An animated progress bar that fills up to ₹999 with dynamic text: "Add ₹X more for FREE Delivery".
> 3. Item List:
>    - Group items by Seller/Nursery (e.g. "From Abhay's Rooftop Nursery", "From Bengal Bonsai Studio").
>    - Each item has: plant image, name, size label, pot type, price in INR, quantity increment/decrement controls, and a delete button.
> 4. Empty State: If cart is empty, show a cute plant illustration, "Your bag is empty", and a "Start Shopping" button linking to /shop.
> 5. Coupon Code Section: Collapsible input field for coupon code with a test code "ROOFTOP10" that subtracts 10% on apply with a success toast.
> 6. Footer Total Breakdown: Subtotal, Eco Packaging (FREE), Delivery Fee (FREE/₹99), Total Amount.
> 7. "Proceed to Checkout" primary button linking to /checkout.
> Style with deep forest green (#1A3325), warm cream background, and crisp typography.
> ```

---

### Page 3: Multi-Step Checkout Page (`/checkout`)
* **Route:** `/checkout`
* **Purpose:** Professional, distraction-free checkout flow designed to give clients full confidence in customer order handling.

#### Key Features:
1. **Distraction-Free Minimal Header:** Abhay's Roof Garden Logo + "Secure Checkout" badge with padlock.
2. **Left Column — Two-Step Checkout Form:**
   * **Step 1: Contact & Delivery Address:**
     * Full Name, WhatsApp Mobile Number (for delivery tracking), Email address.
     * Street Address, Apartment/Floor, City, State, PIN code.
     * Delivery instructions field (e.g. *"Leave with security"* or *"Ring bell"*).
   * **Step 2: Shipping Method:**
     * Standard Green Transit (2-4 business days) — Free
     * Hyperlocal Fast Nursery Courier (Same day / Next day in city) — ₹149
   * **Step 3: Payment Options (Mock Selection):**
     * Cash on Delivery (COD) with ₹0 advance.
     * UPI / QR Code (Google Pay, PhonePe, Paytm).
     * Net Banking & Credit/Debit Card.
3. **Right Column — Sticky Order Summary:**
   * Compact list of plants being ordered with thumbnails.
   * Price breakdown, taxes included, guaranteed 7-day health badge.
4. **"Complete Order" Button:**
   * On click, runs mock 1-second loading spinner and redirects automatically to `/order-success/[orderId]`.

> #### 📋 Vercel / v0 AI Prompt for Page 3:
> ```text
> Create a modern, distraction-free E-Commerce Checkout Page for Next.js 16 (App Router) with Tailwind CSS v4 in TypeScript.
> Brand: "Abhay's Roof Garden Collective" (Deep green #1A3325, warm cream, serif headings).
> 
> Layout:
> - Minimal top bar with store logo, lock icon, and "100% Encrypted Checkout".
> - Two columns on desktop (max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10):
>   - Left Column (Form Steps):
>     1. Contact Information: Email and WhatsApp Phone Number (with +91 country prefix).
>     2. Shipping Address: Full Name, Address line, Apartment/Flat, City, State dropdown (India), 6-digit PIN Code.
>     3. Delivery Method Selection: Radio cards for "Standard Nursery Transit (Free)" and "Express Local Courier (₹149)".
>     4. Payment Method Selection: Custom radio cards for "Cash on Delivery (COD)", "UPI (GPay / PhonePe / QR)", and "Credit/Debit Card". Show a note: "Pay securely after your plants arrive healthy".
>   - Right Column (Order Summary Card):
>     - List of items with plant images, title, size, pot type, and price.
>     - Subtotal, Delivery, Eco-Transit Box Fee (Free), Grand Total.
>     - Security assurances: "7-Day Transit Guarantee", "Eco-friendly Biodegradable Packaging".
>   - CTA: Big button "Confirm & Place Order (₹X)" that on click shows a loading state and redirects to '/order-success/ARG-8291'.
> ```

---

### Page 4: Order Confirmation & Live Tracking Pages (`/order-success/[orderId]` & `/track-order`)
* **Routes:** `/order-success/[orderId]` and `/track-order`
* **Purpose:** Professional post-purchase reassurance showcasing order details and interactive transit timeline.

#### Key Features:
1. **Order Success Banner:** Green celebratory checkmark animation, *"Thank you! Your order has been placed with our local growers."*
2. **Order Metadata Box:** Order ID (e.g. `#ARG-94820`), estimated delivery date (e.g. `Friday, Nov 27`), customer phone, and shipping address.
3. **Interactive 4-Stage Live Progress Bar:**
   * Step 1: **Order Confirmed** (Checked)
   * Step 2: **Harvested & Potted by Nursery** (Active glowing pulse)
   * Step 3: **Moisture-Locked Eco Packaging** (Pending)
   * Step 4: **Out for Delivery with Plant Specialist** (Pending)
4. **Purchased Items Breakdown:** Grouped by nursery with care guide download button.
5. **Actions:**
   * "Track Live on WhatsApp" button with WhatsApp icon.
   * "Download Digital Invoice (PDF)" mock button.
   * "Continue Shopping" button.

> #### 📋 Vercel / v0 AI Prompt for Page 4:
> ```text
> Build a high-trust Order Confirmation & Success page ('/order-success/[orderId]') and Order Tracking page ('/track-order') for Next.js 16 in TypeScript with Tailwind CSS v4.
> 
> Include:
> 1. Celebration header with green check badge, headline "Order Placed Successfully!", and subheadline "Your homegrown plants are being prepared by the nursery."
> 2. Summary Card: Order Number (e.g. #ARG-7841), Date, Payment Method (Cash on Delivery), Delivery to (Customer Address).
> 3. Animated Horizontal Status Timeline:
>    - Step 1: Order Confirmed (Done - Green)
>    - Step 2: Freshly Picked from Nursery (In Progress - Pulsing)
>    - Step 3: Packed in Breathable Eco-Box (Upcoming)
>    - Step 4: Delivered to Your Door (Upcoming)
> 4. Order Details Card: Items ordered with images, quantities, size, prices, and seller name ("Sold by Abhay's Rooftop Nursery").
> 5. Direct WhatsApp Integration Button: "Get Real-Time WhatsApp Updates" in WhatsApp green brand color.
> 6. Helpful Post-Purchase Care Box: "While you wait: Read the unboxing instructions for your new plants" with a link to /care-guide.
> ```

---

### Page 5: Curated Nurseries Directory (`/nurseries`) & Dedicated Nursery Page (`/nurseries/[slug]`)
* **Routes:** `/nurseries` and `/nurseries/[slug]`
* **Purpose:** Demonstrates the multi-vendor marketplace capability to the client and prospective nursery partners.

#### Key Features:
1. **Nurseries Directory (`/nurseries`):**
   * Hero banner: *"Meet Our Local Growers & Rooftop Nurseries"*.
   * Filter tabs: `All Nurseries`, `Rooftop Nurseries`, `Bonsai Specialists`, `Succulents & Cacti`, `Near You (< 5km)`.
   * Nursery Cards: Cover banner, nursery avatar, name, location badge, specialty tag, rating stars, total plants listed, and a "Browse Plants" button.
2. **Nursery Storefront Page (`/nurseries/[slug]`):**
   * Nursery Banner with profile picture, verified grower badge, contact/location info, and founder's bio (e.g., *"Growing organic rare aroids on a 1200 sq.ft terrace in Ballygunge since 2018"*).
   * Key stats: `24+ Plants Listed`, `4.9 ★ Seller Rating`, `99% On-Time Dispatch`.
   * Nursery's full product catalog with filter sidebar (same UI as `/shop` but scoped to this specific grower).

> #### 📋 Vercel / v0 AI Prompt for Page 5:
> ```text
> Create the Marketplace Multi-Vendor pages for Next.js 16 (App Router) in Tailwind CSS v4 and TypeScript:
> 1. '/nurseries' (The Growers Directory):
>    - Hero with Fraunces serif heading: "The Nurseries Behind Your Plants".
>    - Filter buttons: All, Rooftop Growers, Bonsai & Exotics, Flowering, Nearby (<10km).
>    - Grid of Nursery cards (3 columns desktop, 1 column mobile).
>    - Card details: Nursery photo banner, nursery avatar, name (e.g. "Abhay's Flagship Garden", "Eden Green Nursery", "Salt Lake Succulent Studio"), location pill ("South Kolkata"), rating (4.9 ★), specialty ("Indoor Aroids & Monsteras"), number of plants, and "Visit Nursery" button linking to /nurseries/[slug].
> 2. '/nurseries/[slug]' (Single Nursery Storefront):
>    - Top Header Banner with nursery cover, verified badge, bio, location, and owner quote.
>    - Trust Badges: "100% Organic Soil", "7-Day Transit Warranty", "Verified Rooftop Grower".
>    - Filterable catalog of all products belonging only to this nursery with size selector and add-to-cart buttons.
> Match the botanical luxury theme (#1A3325, warm cream, Fraunces serif).
> ```

---

### Page 6: "Sell With Us / Join the Collective" Page (`/sell`)
* **Route:** `/sell`
* **Purpose:** The pitch page for the client to onboard local nurseries, complete with a working mock application form.

#### Key Features:
1. **Hero Section:** *"Grow Your Nursery Business with Abhay's Roof Garden"* + *"List your plants on Bengal's premier homegrown botanical marketplace"*.
2. **4 Key Partner Benefits:**
   * **Hyperlocal Customers:** Reach plant enthusiasts in your city without spending on marketing.
   * **Eco-Packaging Provided:** We supply custom breathable boxes and pots.
   * **Zero Upfront Cost:** No listing fees; transparent modest commission only when a plant sells.
   * **Safe Plant Logistics:** Hyperlocal courier pickups directly from your nursery gate.
3. **Step-by-Step Onboarding Graphic:**
   * 1. Apply Online $\rightarrow$ 2. Nursery Quality Check $\rightarrow$ 3. List Plants $\rightarrow$ 4. Receive Orders.
4. **Interactive Grower Application Form (`<GrowerApplicationForm />`):**
   * Nursery / Garden Name, Owner Name, WhatsApp Number, Email.
   * Nursery Type: Commercial Ground Nursery, Home Rooftop / Terrace Garden, Micro-Grower / Hobbyist.
   * Nursery Address, City, PIN code.
   * Main Specialties: Multi-select pills (Indoor, Flowering, Bonsai, Succulents, Herbs, Exotic Aroids).
   * Photo Upload preview area (Drag & drop photos of the nursery).
   * Submit Button: Displays an interactive "Application Received! Our curator will visit your nursery within 48 hours" confirmation modal.

> #### 📋 Vercel / v0 AI Prompt for Page 6:
> ```text
> Build a high-converting Seller Onboarding Page ('/sell') for Next.js 16 in TypeScript with Tailwind CSS v4 for a botanical nursery marketplace.
> 
> Structure:
> 1. Hero: Fraunces serif heading "Turn Your Green Passion Into A Thriving Business. Sell With Us.", high-res nursery background, and a "Join as a Partner Nursery" CTA button that scrolls to the form.
> 2. Why Partner With Us (4 Feature Cards):
>    - "Zero Listing Fees": Only pay when you make a sale.
>    - "We Supply The Packaging": Eco-friendly transit boxes that protect plants.
>    - "Hyperlocal Pickups": Couriers pick up straight from your rooftop or nursery.
>    - "Instant Weekly Payouts": Direct bank/UPI settlements.
> 3. How It Works (4 Steps with numbers 01-04): Apply -> Quick Nursery Visit & Verification -> Photography & Listing -> Start Delivering.
> 4. Interactive Partner Application Form:
>    - Nursery Name, Contact Person, WhatsApp Mobile, Email.
>    - Nursery Category: "Rooftop/Terrace Nursery", "Commercial Ground Nursery", "Specialist Boutique Grower".
>    - Plant Types (checkables: Aroids, Bonsai, Flowering, Cacti, Herbs).
>    - City & PIN Code.
>    - Image upload box for nursery photos.
>    - Submit button: Shows an animated success dialog "Application Submitted! Abhay & the curation team will reach out on WhatsApp within 24 hours."
> Match the established brand aesthetic (#1A3325, #0F291E, cream background).
> ```

---

### Page 7: Customer Wishlist & Trust Pages (`/wishlist` & `/guarantee`)
* **Routes:** `/wishlist` and `/guarantee`
* **Purpose:** Essential consumer e-commerce pages that build buyer loyalty and eliminate buyer hesitation.

#### Key Features:
1. **Wishlist Page (`/wishlist`):**
   * Grid of plants saved by clicking the heart button across the site.
   * Persistent in `localStorage`.
   * One-click "Move to Plant Bag" action button for each item.
   * Empty state with plant recommendation links.
2. **Plant Guarantee Page (`/guarantee`):**
   * Full breakdown of the **"7-Day Alive & Thriving Plant Guarantee"**.
   * Clear 3-step claim process: *Take a photo $\rightarrow$ WhatsApp us $\rightarrow$ Instant free replacement dispatched*.
   * Unboxing and first-week watering tips.

> #### 📋 Vercel / v0 AI Prompt for Page 7:
> ```text
> Create the Customer Wishlist ('/wishlist') and the 7-Day Plant Guarantee policy page ('/guarantee') for Next.js 16 and Tailwind CSS v4.
> 
> 1. '/wishlist':
>    - Header: "My Saved Garden" with item count.
>    - Grid of saved product cards reading from localStorage or mock wishlist state.
>    - Each card has: Plant image, botanical name, seller nursery name, price, "Move to Cart" button, and "Remove" icon.
>    - Empty state if no saved plants with a "Discover Plants" CTA.
> 2. '/guarantee':
>    - Editorial Fraunces heading: "Our 7-Day Healthy Plant Promise".
>    - Explanation of transit shock vs plant health.
>    - 3-step graphic: "Snap a photo of the leaves", "Send to WhatsApp Support", "Receive free replacement or refund within 48 hours".
>    - WhatsApp direct chat CTA card with nursery specialists.
> ```

---

## 🚀 4. RECOMMENDED EXECUTION ORDER FOR VERCEL / V0

Follow this exact order so that each page builds naturally on top of the shared state:

| Order | Page / Task | Route | Purpose |
| :---: | :--- | :--- | :--- |
| **1** | **Shared Data & Cart Store** | `src/lib/store/cart-store.ts` | Upgrades cart to persistent multi-item store |
| **2** | **Slide-Over Cart Drawer** | `<CartDrawer />` | Adds interactive bag across all pages |
| **3** | **Product Detail Page (PDP)** | `/shop/[slug]` | Complete product page with size & seller box |
| **4** | **Checkout Page** | `/checkout` | 2-step delivery & mock payment selection |
| **5** | **Order Success & Tracking** | `/order-success/[orderId]` | Purchase confirmation & transit timeline |
| **6** | **Nurseries Directory** | `/nurseries` | Shows all partner nurseries & local growers |
| **7** | **Single Nursery Storefront** | `/nurseries/[slug]` | Dedicated catalog for each seller |
| **8** | **"Sell With Us" Partner Page** | `/sell` | Onboarding pitch and application form |
| **9** | **Wishlist & Plant Guarantee** | `/wishlist`, `/guarantee` | Completes the luxury brand experience |

---

*This document is saved in the project root as `FRONTEND_MARKETPLACE_SPEC.md` for immediate use with Vercel and v0.*
