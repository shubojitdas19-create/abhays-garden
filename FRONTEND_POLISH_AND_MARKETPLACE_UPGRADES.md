# 🌿 ABHAY'S ROOF GARDEN — MASTER UX, BUG FIXES & SYSTEM UPGRADES BLUEPRINT

> **DOCUMENT PURPOSE:**  
> This document is the complete master audit and actionable implementation guide for polishing the entire **Abhay's Roof Garden** frontend.  
> It covers every bug, layout glitch, missing user flow (User Account, Order Tracking & Login), product-only share feature, mobile horizontal slider fix, and the new **Community, Reviews, Journal, and Navigation Refinements**.  
> Each section provides **ready-to-copy prompts for Vercel / v0.app**.

---

## 🚨 1. RESOLVING THE MOBILE "SLIDER" (HORIZONTAL SCROLL) BUG

### What is the "Mobile Slider" Glitch?
On mobile devices, when you swipe left or right, the entire page shifts horizontally, exposing an unwanted white empty gap on the right. This makes the website feel broken and unpolished on touchscreens.

### Why Does This Happen?
1. **Missing Viewport Containment in `globals.css` and `layout.tsx`:**  
   The `html` and `body` tags do not have `overflow-x: clip` or `max-width: 100vw`.
2. **Negative Margins (`-mx-4` or `-mx-6`) on Full-Width Carousels:**  
   In `nursery-catalog.tsx`, `customer-reviews.tsx`, `bestsellers.tsx`, and `categories.tsx`, negative margins (`-mx-4`) stretch elements outside the parent container without a parent `overflow-hidden`.
3. **Fixed Floating Elements:**  
   The sticky bottom bar (`fixed inset-x-0 bottom-0`) in `product-detail.tsx` lacks `max-w-full`, occasionally pushing viewport widths on iOS Safari.

### The 1-Minute Fix:
Add this rule directly to `src/app/globals.css`:
```css
html, body {
  max-width: 100vw;
  overflow-x: clip; /* Modern replacement for overflow-x: hidden that doesn't break sticky headers */
}
```
And wrap pages in an `<div className="w-full max-w-full overflow-x-hidden">` container.

---

## 📦 2. PRODUCT-PAGE-ONLY SHARE SYSTEM

> **Client Rule:** Share options must **ONLY** be available on the **Product Detail Page (`/shop/[slug]`)**, NOT cluttering the listing cards on the shop or homepage.

### UI / UX Behavior:
1. **Placement:**  
   * **Desktop:** Positioned in the action row right beside the Wishlist button as a sleek circular button (`Share2` icon).
   * **Mobile:** Placed in the secondary action row above the full-width "Add to plant bag" button.
2. **Interactive Action:**
   * **On Mobile (Touch):** Automatically invokes the native `navigator.share({ title, text, url })` so users can share directly to WhatsApp, Instagram Stories, Messages, or AirDrop.
   * **On Desktop (Click):** Opens a stylish popover or modal featuring:
     * **Copy Link:** 1-click button that writes to clipboard and displays an animated toast: `"✓ Plant link copied to clipboard!"`.
     * **Share via WhatsApp:** Direct link to `https://wa.me/?text=Check%20out%20this%20beautiful%20[Plant%20Name]%20at%20Abhay's%20Roof%20Garden...`.
     * **Share on X / Pinterest / Email.**

---

## 👤 3. USER ACCOUNT, LOGIN MODAL & PERSISTENT ORDER TRACKING

Currently, when a user completes an order, they receive an Order ID, but there is no way to retrieve it later, and the header `User` button does nothing.

### 1. Persistent Order History Engine (`localStorage`)
* When an order is placed on `/checkout`:
  * Save the order object into `localStorage` key `arg-customer-orders`.
  * Fields saved: `id`, `date`, `items` (with images, names, sizes, pots, nurseries), `deliveryAddress`, `totalAmount`, `status` (*"Freshly picked from nursery"*), `trackingStep` (1 to 4).

### 2. User Account & "My Orders" Page (`/account`)
* **Route:** `/account`
* **Features:**
  * **Welcome Header:** Displays customer name and avatar (e.g., *"Welcome back, Sneha 🌱"*).
  * **Tab 1: "My Plant Orders" (Active by default):**
    * Lists all past & active orders.
    * Each order card displays: Order ID (e.g. `#ARG-94820`), order date, thumbnail images of plants, current status badge (*"Freshly Picked"*, *"Out for Delivery"*), total amount, and a prominent **"Track Live Order"** button linking directly to `/order-success/[orderId]`.
  * **Tab 2: "Saved Addresses":**
    * Default delivery address, edit/add address form for quick 1-click reordering.
  * **Tab 3: "My Saved Garden" (Wishlist):**
    * Direct preview of saved plants with 1-click "Move to Bag".
  * **Tab 4: "Nursery Partner Link":**
    * *"Are you a local grower? Access your Nursery Dashboard or Apply to Sell"*.

### 3. Customer Authentication / Login Modal (`<AuthModal />` & `/login`)
* **Features:**
  * Clean, botanical slide-in dialog or dedicated page.
  * **Step 1:** Enter WhatsApp Mobile Number or Email.
  * **Step 2:** Simulated 4-digit OTP input (`1 2 3 4`) with auto-focus.
  * On verify: Logs user in instantly, sets customer name in `localStorage` (`arg-current-user`), and updates the Header icon from generic user icon to user's initials/name.

---

## 🎨 4. LUXURY MICRO-ANIMATIONS, TRANSITIONS & EFFECTS SUITE

To elevate the site from a standard website to a luxury D2C brand experience:

| Element | Professional Micro-Interaction / Effect |
| :--- | :--- |
| **Add to Cart Action** | Floating toast notification with plant thumbnail + Cart drawer automatically slides in from the right with a soft spring curve. |
| **Cart Bag Count Icon** | Header bag count badge bounces (`animate-bounce-once` or `scale-125 -> scale-100`) whenever an item is added. |
| **Product Card Image** | Smooth gentle zoom on hover (`scale-[1.035]`) with 700ms ease-out; image loads with a warm sage shimmer skeleton before rendering. |
| **Category Visual Tiles** | Cards lift upwards by 6px (`hover:-translate-y-1.5`) with an expanded soft shadow. |
| **Size & Planter Pills** | Subtle radio pop animation with green border ring expansion on click. |
| **Live Sticky Mobile Bar** | Slides smoothly up from the bottom (`translate-y-0 duration-300`) only when scrolling past the main buy box, and slides down out of view when scrolling back up. |
| **Announcement Bar** | Smooth vertical fade transition rotating between curated brand messages every 4 seconds. |
| **WhatsApp Direct CTAs** | Floating green pulse animation on WhatsApp support pills. |

---

## 🛠️ 5. SITE-WIDE GLITCH & BUG AUDIT CHECKLIST

| Location | Issue Found | Fix Required |
| :--- | :--- | :--- |
| **`globals.css`** | Mobile horizontal scroll / page sliding. | Add `overflow-x: clip` to `html, body`. |
| **`/shop/[slug]`** | Duplicate Add-to-Cart buttons on mobile. | Hide fixed bottom bar until scrolling past inline buy box. |
| **`/shop/[slug]`** | 216px blank space between content & footer. | Reduce `<main>` padding from `pb-36` to `pb-10 sm:pb-14`. |
| **`/shop/[slug]`** | Frequently bought together scrollbar ugly. | Add `no-scrollbar` and horizontal touch snap with desktop chevrons. |
| **`SiteHeader`** | Desktop `User` icon is an unlinked button. | Link to `/account` and open `<AuthModal />` if not logged in. |
| **`SiteHeader`** | Mobile hamburger lost on deep scroll. | Ensure sticky top header has `z-50 backdrop-blur-md` and smooth trigger. |
| **`bestsellers.tsx`**| Product image clicks do not open product page. | Wrap card image/container in `<Link href="/shop/[slug]">`. |
| **`bestsellers.tsx`**| Feature card links to `#`. | Link Feature Card to `/shop/fiddle-leaf-fig`. |
| **Homepage** | Categories appears before Bestsellers. | Reorder: Place `<Bestsellers />` before `<ShopCategories />`. |
| **Site-wide** | "Free delivery over ₹999" promised. | Remove free delivery claims everywhere; show flat/standard rate. |
| **`/guarantee`** | Old policy doesn't mention 360° unboxing video. | Update policy: 360° unboxing video mandatory; covers wrong/damaged plants only. |

---

## 📋 6. READY-TO-COPY VERCEL / V0 PROMPTS (PHASE 1)

---

### 🟢 PROMPT 1: Fix Mobile Horizontal Page Slider & Spacing Overhaul

```text
Update 'src/app/globals.css', 'src/app/layout.tsx', and 'src/components/store/product/product-detail.tsx' for Next.js 16 and Tailwind CSS v4 in TypeScript to fix the mobile layout overflow and section spacing:

1. ELIMINATE MOBILE HORIZONTAL SCROLL ("SLIDER" GLITCH):
   - In globals.css, ensure 'html, body' has:
     max-width: 100vw;
     overflow-x: clip;
   - Ensure the utility class 'no-scrollbar' hides webkit and firefox scrollbars properly.
   - In layout.tsx, add 'w-full max-w-full overflow-x-hidden' to the main wrapper to guarantee zero horizontal page wiggling on iPhone and Android screens.

2. FIX MASSIVE BLANK GAP BEFORE FOOTER:
   - In 'src/components/store/product/product-detail.tsx', change '<main className="... pb-36 lg:pb-40 ...">' to 'pb-10 sm:pb-14 lg:pb-16'.
   - Ensure no excess margin or padding is applied between the "Frequently bought together" section and the SiteFooter.

3. FIX MOBILE DUPLICATE ADD-TO-CART BUTTONS:
   - On mobile screens, hide the fixed bottom sticky bar initially.
   - Use an IntersectionObserver to observe the inline purchase section. Only show the fixed bottom bar (translate-y-0 opacity-100 transition-all duration-300) when the user scrolls past the main buy box.
   - On the inline purchase section on mobile, reorganize the layout so it is not cramped:
     * Make "Add to plant bag" a full-width, touch-friendly primary button (h-12 w-full rounded-full bg-[#1A3325] text-white font-semibold).
     * Place the quantity stepper (- 1 +), Wishlist button, and Share button in a clean row above it.
```

---

### 🟢 PROMPT 2: Product Page ONLY Share System

```text
Add a dedicated, high-converting Share feature to 'src/components/store/product/product-detail.tsx' (available on the Product Detail Page ONLY, not on product listing cards):

1. UI PLACEMENT:
   - Place a circular Share button (Share2 icon from lucide-react) next to the Wishlist heart button on the image gallery and inside the purchase action row.
   - Style: size-11 inline-flex items-center justify-center rounded-full border border-[#dedfd5] text-[#1A3325] hover:bg-[#f1f4ee] transition-colors.

2. INTERACTIVE BEHAVIOR:
   - When clicked on mobile/tablet:
     * Check if navigator.share exists. If so, trigger native Web Share:
       navigator.share({
         title: `${product.name} — Abhay's Roof Garden`,
         text: `Look at this homegrown ${product.name} from ${product.nursery.name}!`,
         url: window.location.href,
       })
   - When clicked on desktop (or if navigator.share is unavailable):
     * Open an elegant, lightweight popover / dialog containing:
       1. "Share this homegrown plant" title in Fraunces serif.
       2. Copy Link row with input field and "Copy" button. Clicking copies the current URL to clipboard and triggers an animated toast: "✓ Plant link copied to clipboard!".
       3. "Share on WhatsApp" button with WhatsApp brand green background that opens:
          `https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} at Abhay's Roof Garden: ` + window.location.href)}`
       4. Social icons for X (Twitter), Facebook, and Pinterest.

Keep styling consistent with our brand aesthetic (#1A3325, #F9F8F6, Fraunces serif).
```

---

### 🟢 PROMPT 3: User Account (`/account`), Login Modal & Persistent Order History

```text
Build a complete User Account, Order History, and Authentication system for Next.js 16 in TypeScript with Tailwind CSS v4:

1. PERSISTENT ORDERS IN LOCALSTORAGE:
   - In 'src/components/store/checkout/checkout-content.tsx', when an order is completed, save the order object into localStorage ('arg-customer-orders') with:
     id, date, items, totalAmount, shippingAddress, status ("Freshly picked by grower"), and trackingStage (1).
   - Redirect to '/order-success/{orderId}'.

2. USER ACCOUNT PAGE ('/account'):
   - Header with user greeting: "Welcome back, Sneha 🌱" and membership badge "Botanical Collective Member".
   - Four interactive tabs:
     * Tab 1: "My Orders":
       - Reads orders from localStorage ('arg-customer-orders'). If empty, shows default sample order (#ARG-94820) so the client demo is never empty.
       - Each order card displays: Order ID, Date, Plant thumbnails, Status pill ("In Transit", "Delivered"), and a "Track Order Status" button linking to '/order-success/{orderId}'.
     * Tab 2: "Saved Addresses":
       - Displays default shipping address with "Edit" and "Add New Address" modal.
     * Tab 3: "My Wishlist":
       - Displays saved plants from the cart context with 1-click "Move to Bag".
     * Tab 4: "Grower Portal":
       - For seller partners: "Are you an approved nursery? Switch to Grower Dashboard" linking to /sell.

3. AUTHENTICATION / LOGIN MODAL (<AuthModal />):
   - Accessible from the 'User' icon in SiteHeader and mobile navigation menu.
   - If user is logged in, clicking the icon navigates directly to '/account'.
   - If not logged in, opens a smooth slide-in modal:
     * Step 1: Phone number input (with +91 country prefix) or Email.
     * Step 2: 4-digit OTP input (default demo code: 1234).
     * On verify: Saves user session to localStorage ('arg-current-user') and updates Header with user avatar initials.

4. SITE HEADER INTEGRATION:
   - In 'site-header.tsx', wire up the desktop User icon button so it opens the AuthModal or links to '/account'.
```

---

### 🟢 PROMPT 4: Public Seller Storefront with Hero Logo Banner & Store Share

```text
Update the Nursery Storefront in 'src/app/nurseries/[slug]/page.tsx' and 'src/components/store/nursery-catalog.tsx' for Next.js 16 with Tailwind CSS v4 in TypeScript:

1. PROMINENT SELLER LOGO & HERO BANNER:
   - Full-bleed rooftop nursery cover banner with a soft dark gradient overlay.
   - Anchor the nursery's circular logo avatar (size-20 sm:size-24) at the bottom-left of the cover photo with a 3px white border and shadow.
   - Beside the logo, display:
     * Nursery Name in Fraunces serif (text-3xl sm:text-5xl font-semibold text-white).
     * "Verified Local Grower" green checkmark badge.
     * Location tag ("South Kolkata • 3.5 km away").
     * Star rating with order count ("★ 4.9 • 1,200+ orders").

2. STORE SHARE & CONTACT ACTION BAR:
   - Add a prominent "Share Nursery" button:
     * Copies the public store link (e.g. /nurseries/eden-green) with an animated toast "✓ Store link copied!".
     * Includes a direct "Share on WhatsApp" button with prefilled message.
   - Add a "Message Nursery on WhatsApp" button for custom plant requests.

3. IN-STORE PLANT SEARCH:
   - Add a search input: "Search inside {nursery.name}..." filtering the seller's catalog in real-time.
   - Category filter pills for this nursery's plants.
```

---

### 🟢 PROMPT 5: Site-Wide Micro-Animations & Professional Touches

```text
Add high-end D2C micro-animations and polish across the entire store:

1. TOAST NOTIFICATION SYSTEM:
   - Add a lightweight floating toast provider (using Sonner or custom toast) that displays floating alerts at the top-right or bottom-center:
     * "Added [Plant Name] to your plant bag" (with plant thumbnail and "View Bag" button).
     * "Saved to your wishlist".
     * "Link copied to clipboard".

2. CART ICON BOUNCE ANIMATION:
   - In SiteHeader, make the cart item count badge bounce and pop briefly whenever an item is added to the cart.

3. CAROUSEL ELEVATION:
   - In 'src/components/store/product/product-sections.tsx' and customer reviews, hide native scrollbars with 'no-scrollbar', add 'snap-x snap-mandatory', and show subtle left/right chevron buttons on desktop hover.
```

---

## 📌 7. RECOMMENDED STEP-BY-STEP EXECUTION ORDER (PHASE 1)

| Step | Action | Focus Area |
| :---: | :--- | :--- |
| **1** | **Run Prompt 1** | Fixes the mobile horizontal slider overflow, eliminates the blank space before the footer, and fixes the duplicate Add-to-Cart buttons. |
| **2** | **Run Prompt 2** | Adds the dedicated "Share Plant" button to the Product Detail Page ONLY. |
| **3** | **Run Prompt 3** | Builds the User Account (`/account`), persistent Order History, and Login Modal. |
| **4** | **Run Prompt 4** | Adds the Nursery Logo Hero Banner and Storefront Share link to `/nurseries/[slug]`. |
| **5** | **Run Prompt 5** | Adds rich toast notifications, cart bounce animations, and polished carousels. |

---

## 🌟 8. STEP-BY-STEP SPECIFICATION FOR POINT 8: REFINEMENTS, COMMUNITY, REVIEWS & BLOG

This section breaks down the 8 new client requirements step-by-step with UI/UX specifications, file locations, and ready-to-copy Vercel/v0 prompts (Prompts 6 through 10).

---

### 8.1 Detailed Feature Breakdown of the 8 Refinements

#### Refinement 1: Homepage Section Reordering (Bestsellers Above Categories)
* **File:** `src/app/page.tsx`
* **Change:**  
  Swap the order of components inside `<main>`.  
  **New Order:** `<Hero />` $\rightarrow$ `<Bestsellers />` $\rightarrow$ `<ShopCategories />` $\rightarrow$ `<RooftopStory />` ...  
* **UX Impact:** High-converting bestsellers are placed immediately below the hero fold, capturing buying intent faster before category exploration.

#### Refinement 2: Bestsellers Full-Card Clickable Navigation Fix
* **Files:** `src/components/store/bestsellers/bestsellers.tsx` & `src/components/store/product-card.tsx`
* **Bug Fixed:** Currently, clicking product images in the Bestsellers grid does not navigate to the product page (only the small title text is a link). The Feature Card (`Fiddle Leaf Fig`) links to `#`.
* **Fix:**
  * Wrap the product card image container in `<Link href={`/shop/${product.slug}`}>`.
  * Update `FeatureCard` in `bestsellers.tsx` to link to `/shop/fiddle-leaf-fig`.
  * Ensure buttons like "Add to cart" and "Wishlist" use `e.stopPropagation()` so they don't accidentally trigger page navigation.

#### Refinement 3: Updated 7-Day Guarantee Policy (Strict 360° Unboxing Video Requirement)
* **Files:** `src/components/store/guarantee-page.tsx`, `src/components/store/product/product-sections.tsx`, `src/components/store/layout/home-footer.tsx`
* **Updated Policy Rules:**
  1. **Strict Eligibility:** Claims apply **ONLY in cases of damaged plants during transit or wrong plant delivered**. Normal leaf drooping/transit shock, repotting shock, or buyer overwatering are excluded.
  2. **Mandatory Proof:** A **continuous, unedited 360° unboxing video** is strictly mandatory. The video must start **before cutting the outer box tape/seal**, showing the shipping label clearly, and capturing the complete unboxing process.
  3. **Claim Window:** Must be submitted within 7 calendar days of delivery via WhatsApp support.
  4. **Resolution:** Verified claims receive an instant free replacement dispatched within 24–48 hours or a full refund.

#### Refinement 4: Complete Removal of "Free Delivery Over ₹999"
* **Files:** `src/components/store/layout/announcement-bar.tsx`, `src/components/store/layout/cart-drawer.tsx`, `src/components/store/cart/cart-page-content.tsx`, `src/components/store/checkout/checkout-content.tsx`
* **Changes:**
  * **Announcement Bar:** Remove `"Free delivery on orders above ₹999"`. Replace with: `"Safe, breathable eco-packaging on all orders · Nursery-grown with care"`.
  * **Cart Drawer & Cart Page:** Remove the free delivery progress bar (`FREE_DELIVERY_THRESHOLD = 999`). Replace with a clean trust badge: `"Flat-rate safe botanical delivery · Potted in nutrient-rich organic soil"`.
  * **Checkout & Summary:** Apply standard transparent delivery charges (e.g., standard eco transit ₹99, or calculated rate) without any false free delivery promises.

#### Refinement 5: Mobile Navigation & Sticky Header Accessibility Fix
* **File:** `src/components/store/layout/site-header.tsx`
* **The Problem:** When scrolling down on mobile, the hamburger menu is unreachable or hidden behind overlapping elements.
* **The Fix:**
  * Ensure the header is permanently pinned with `sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/70`.
  * The hamburger button remains sticky and fully clickable at all scroll positions.
  * Clicking the hamburger opens a full-height, accessible mobile slide drawer (`fixed inset-0 z-[60]`) with smooth slide-in animation, background dimming, and scroll locking (`overflow-hidden` on body).
  * Include direct navigation links to all main destinations: **Shop All**, **Bestsellers**, **Nurseries Directory**, **Community Q&A**, **Reviews**, **Journal/Blog**, **Sell With Us**, and **My Account**.

#### Refinement 6: Community Reviews Hub (`/reviews` & `/reviews/write`) with Seller Replies
* **New Routes:** `/reviews` (Public Reviews Hub) & `/reviews/write` (or Write a Review Modal)
* **Features:**
  * **Rating Overview Header:** Overall platform rating (4.9 ★ based on 1,480+ verified orders) with 5-star breakdown bars.
  * **Filters:** Filter reviews by Star Rating (5★, 4★, 3★), With Customer Photos Only, or by specific Nursery.
  * **Review Cards:** Customer photo, verified buyer badge, plant name linked to PDP, date, review text, and **Seller/Nursery Reply Box** (e.g., *"🌱 Response from Abhay's Roof Garden: Thank you Sneha! Keep the soil slightly moist during summer."*).
  * **"Write a Review" Flow:** Interactive 5-star selector, plant dropdown, review title & description, photo upload preview, and instant simulated submission with success modal.

#### Refinement 7: Reddit-Style Plant Care Q&A Community (`/community` & `/community/[slug]`)
* **New Routes:** `/community` (Feed) & `/community/[slug]` (Question Thread)
* **Purpose:** A public community clinic where gardeners post plant dilemmas and receive answers from other plant parents and verified local nurseries.
* **Features:**
  * **Community Feed (`/community`):**
    * Topic Tabs: `All Discussions`, `Pests & Disease`, `Yellow Leaves`, `Watering & Soil`, `Propagation`, `Bonsai & Exotics`.
    * Search bar: *"Search questions (e.g. monstera yellow leaves)..."*.
    * Prominent green CTA: **"Ask the Community"** button opening the question composer modal.
    * Question Cards: Title, excerpt, plant photo preview, asker name, time ago, helpful upvote counter (`▲ 24`), and reply count (`💬 7 answers`).
  * **Discussion Thread (`/community/[slug]`):**
    * Full question with high-res plant image.
    * **Verified Seller / Expert Answers:** Highlighted in soft green border with badge: *"🌱 Official Answer from Eden Green Nursery"*.
    * Community Answers with upvotes and reply threads.
    * Reply submission box with image attachment option.

#### Refinement 8: Botanical Journal & Growing Blog (`/journal` & `/journal/[slug]`)
* **New Routes:** `/journal` (Blog Index) & `/journal/[slug]` (Article Page)
* **Purpose:** An editorial hub where Abhay and approved partner nurseries publish seasonal tips, care guides, and propagation tricks.
* **Features:**
  * **Blog Index (`/journal`):**
    * Hero Featured Article banner: *"How to Repot Aroids Without Root Shock: A Rooftop Nursery Guide"*.
    * Category pills: `All Articles`, `Seasonal Care`, `Terrace Gardening`, `Aroid Secrets`, `Organic Fertilizers`.
    * Grid of editorial cards: High-res photo, reading time (`5 min read`), category tag, title in Fraunces serif, excerpt, and author avatar (*"By Abhay Sen, Master Grower"*).
  * **Article Detail (`/journal/[slug]`):**
    * Clean, distraction-free reading typography with Fraunces serif headings and Inter body.
    * Table of Contents sticky sidebar on desktop.
    * Embedded **"Plants Mentioned in this Guide"** widget with quick-add cards (e.g. reading about Monsteras gives an instant "Buy Monstera Deliciosa — ₹899" card).
    * Author bio box + Related Articles carousel.

---

### 8.2 Summary of Modified Files and New Routes

| Action | Route / File | Purpose |
| :---: | :--- | :--- |
| **Update** | `src/app/page.tsx` | Move Bestsellers section above Categories. |
| **Update** | `src/components/store/bestsellers/bestsellers.tsx` | Fix product image click navigation to `/shop/[slug]`. |
| **Update** | `src/components/store/guarantee-page.tsx` | Update policy with mandatory 360° unboxing video rule. |
| **Update** | `announcement-bar.tsx` & `cart-drawer.tsx` | Remove "Free delivery over ₹999" claims completely. |
| **Update** | `src/components/store/layout/site-header.tsx` | Fix mobile sticky header accessibility & add new nav links. |
| **New Route** | `src/app/reviews/page.tsx` | Public Reviews Hub with nursery replies & rating filters. |
| **New Route** | `src/app/reviews/write/page.tsx` | Guided "Write a Review" form with star selector & photo upload. |
| **New Route** | `src/app/community/page.tsx` | Reddit-style Plant Care Q&A discussion feed. |
| **New Route** | `src/app/community/[slug]/page.tsx` | Question thread with verified nursery expert answers. |
| **New Route** | `src/app/journal/page.tsx` | Editorial botanical blog index with category filters. |
| **New Route** | `src/app/journal/[slug]/page.tsx` | Article reader with author bio & linked product cards. |

---

## 📋 8.3 READY-TO-COPY VERCEL / V0 PROMPTS (PHASE 2)

---

### 🟢 PROMPT 6: Homepage Reordering, Bestsellers Link Fix, Guarantee Policy & Free-Delivery Removal

```text
Perform these 4 essential refinements across 'src/app/page.tsx', 'src/components/store/bestsellers/bestsellers.tsx', 'src/components/store/guarantee-page.tsx', and 'src/components/store/layout/announcement-bar.tsx' for Next.js 16 in TypeScript with Tailwind CSS v4:

1. REORDER HOMEPAGE SECTIONS:
   - In 'src/app/page.tsx', move the <Bestsellers /> component directly above <ShopCategories /> so visitors see bestsellers right after the Hero section:
     <Hero />
     <Bestsellers />
     <ShopCategories />
     <RooftopStory />
     ...

2. FIX BESTSELLERS CLICKABLE LINKS:
   - In 'src/components/store/bestsellers/bestsellers.tsx' and 'product-card.tsx':
     * Make sure clicking the product image, badge, or card title navigates smoothly to '/shop/{product.slug}'.
     * In FeatureCard (Plant of the Month - Fiddle Leaf Fig), replace href="#" with href="/shop/fiddle-leaf-fig".
     * Ensure internal buttons like "Quick Add" and "Wishlist" call e.stopPropagation() so clicking them does not trigger link navigation.

3. UPDATE 7-DAY PLANT GUARANTEE POLICY (MANDATORY 360° UNBOXING VIDEO):
   - In 'src/components/store/guarantee-page.tsx' and everywhere the guarantee is referenced:
     * Clearly state the strict condition: "Claims apply strictly to plants that arrive damaged in transit or if the wrong plant is delivered."
     * Highlight the evidence requirement: "A continuous, unedited 360° unboxing video starting BEFORE opening the package seal/tape is strictly mandatory to claim replacement or refund."
     * Update the 3 claim steps:
       Step 01: Record 360° unboxing video (show shipping label and package opening).
       Step 02: Send video & order ID to WhatsApp support (+91 94764 33880) within 7 days.
       Step 03: Free healthy replacement dispatched within 24-48 hours or full refund.

4. REMOVE "FREE DELIVERY OVER ₹999" PROMISES:
   - In 'announcement-bar.tsx', remove "Free delivery on orders above ₹999". Replace with:
     "Safe, breathable eco-transit packaging on every plant · Rooted with love in Bengal"
   - In 'cart-drawer.tsx', 'cart-page-content.tsx', and 'checkout-content.tsx', remove the free delivery progress bar. Display a transparent flat delivery fee (e.g. ₹99) or standard eco-shipping badge.

Preserve all existing Fraunces serif headings and earthy green palette (#1A3325, #0F291E, #F9F8F6).
```

---

### 🟢 PROMPT 7: Mobile Sticky Header Accessibility & Persistent Navigation

```text
Upgrade 'src/components/store/layout/site-header.tsx' for Next.js 16 with Tailwind CSS v4 to guarantee permanent mobile accessibility:

1. PERMANENT STICKY HEADER ACCESSIBILITY ON MOBILE:
   - Ensure the <header> remains permanently anchored at the top of the screen during all scrolling:
     'sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-md'
   - Ensure the mobile hamburger menu button is always visible, touch-friendly (min-h-[44px] min-w-[44px]), and never obscured by sticky bottom bars or carousels.

2. FULL-HEIGHT MOBILE SLIDE DRAWER:
   - When menuOpen is true, render a smooth full-height navigation drawer:
     'fixed inset-0 top-16 z-50 flex flex-col bg-background/98 px-6 py-6 backdrop-blur-lg overflow-y-auto'
   - Prevent background body scrolling when menu is open.
   - Include clear, well-spaced navigation links (text-lg font-medium text-foreground hover:text-[#1A3325]):
     * Shop All Plants (/shop)
     * Bestsellers (/#bestsellers)
     * Local Nurseries (/nurseries)
     * Plant Care Q&A (/community)
     * Customer Reviews (/reviews)
     * Botanical Journal (/journal)
     * Sell With Us (/sell) [Styled as a prominent warm badge]
   - Bottom Action Row inside drawer: Quick buttons for "My Account" (/account), "Saved Wishlist" (/wishlist), and "WhatsApp Support".
```

---

### 🟢 PROMPT 8: Verified Customer Reviews Hub (`/reviews` & `/reviews/write`) with Seller Replies

```text
Create the Customer Reviews system for Next.js 16 in TypeScript with Tailwind CSS v4:

1. PUBLIC REVIEWS HUB ('/reviews'):
   - Header with Fraunces serif title: "Real Stories from Real Plant Parents".
   - Rating Summary Box:
     * Overall 4.9 ★ based on 1,480+ orders.
     * Progress bars for 5-star (88%), 4-star (9%), 3-star (2%), etc.
     * "Write a Review" primary button linking to '/reviews/write'.
   - Filter & Search Bar:
     * Filter pills: "All Reviews", "With Photos Only", "5 Stars Only", "Nursery Replies".
   - Review Cards Grid (2 columns desktop, 1 column mobile):
     * Reviewer name with "Verified Buyer" green checkmark badge.
     * Star rating, date, and linked plant thumbnail ("Purchased: Monstera Deliciosa").
     * Review text with customer plant photo preview (clicking expands image).
     * SELLER / NURSERY REPLY BOX: If a nursery responded, show a nested card with soft green background:
       "🌱 Response from Abhay's Roof Garden: 'Thank you Sneha! Your monstera looks stunning near that window. Remember to mist the aerial roots!'"

2. GUIDED "WRITE A REVIEW" PAGE ('/reviews/write'):
   - Clean, friendly submission form:
     * Step 1: Select Plant Purchased (dropdown of store plants).
     * Step 2: Star Rating selector (interactive clickable 5 stars).
     * Step 3: Review Headline & Detailed Experience textarea.
     * Step 4: Photo Upload box (drag & drop or camera upload with thumbnail preview).
     * Step 5: Full Name and City (e.g. Kolkata).
     * Submit button: Displays an animated success dialog "Thank you for sharing your plant journey! Your review has been submitted." with a button back to /reviews.

Match the established brand aesthetic (#1A3325, #F9F8F6, Fraunces serif).
```

---

### 🟢 PROMPT 9: Reddit-Style Plant Care Q&A Community (`/community` & `/community/[slug]`)

```text
Build a Reddit-style public Plant Care Q&A Forum for Next.js 16 in TypeScript with Tailwind CSS v4:

1. COMMUNITY CLINIC FEED ('/community'):
   - Hero Banner: Fraunces heading "The Plant Care Clinic & Community" + subheadline "Ask plant questions, share propagation wins, and get advice from fellow growers and verified nurseries."
   - Action Bar:
     * Search input: "Search questions (e.g. why are my pothos leaves yellowing?)..."
     * "Ask a Question" primary button opening a question submission modal.
   - Topic Categories (Filter Pills):
     * All Discussions, Yellow Leaves & Rot, Pests & Bugs, Soil & Potting, Light & Placement, Propagation.
   - Question Cards Feed (Clean Reddit / StackOverflow style):
     * Upvote counter button (▲ Upvote with number, e.g. 18).
     * Question title (font-serif text-lg font-semibold hover:text-[#527358]).
     * Asker avatar, name, time ago (e.g. "Posted by Rohan D. · 3 hours ago").
     * Category badge pill (e.g. "Pest Control").
     * Plant photo thumbnail if attached.
     * Footer stats: "💬 6 answers", "🌱 1 Verified Nursery response".
     * Entire card links to '/community/{slug}'.

2. QUESTION DETAIL & DISCUSSION THREAD ('/community/[slug]'):
   - Breadcrumb: Community > Topic > Question Title.
   - Main Question Card: Full question text, high-res plant problem photo, upvote button, and share button.
   - Answers Section:
     * VERIFIED NURSERY OFFICIAL ANSWER (Pinned at top if present): Highlighted with green border and badge: "🌱 Official Answer by Eden Green Nursery".
     * Community answers with user name, timestamp, and upvote counters.
   - Reply Composer: Textarea with "Post your advice" button and image attach button.

3. "ASK A QUESTION" MODAL:
   - Dialog with inputs: Question Title, Plant Name / Species, Topic Category dropdown, Detailed Problem description, and Photo Upload.
   - Submits into local state with instant toast notification.
```

---

### 🟢 PROMPT 10: Editorial Botanical Journal & Growing Blog (`/journal` & `/journal/[slug]`)

```text
Build an editorial Botanical Journal & Blog for Next.js 16 in TypeScript with Tailwind CSS v4:

1. JOURNAL INDEX PAGE ('/journal'):
   - Header with Fraunces serif: "The Rooftop Journal: Stories, Guides & Plant Wisdom".
   - Featured Editorial Article Banner:
     * Full-width split card with large cover image.
     * Tag "Master Class · 6 min read".
     * Headline: "How to Repot Aroids Without Root Shock: A Rooftop Grower's Manual".
     * Author: "By Abhay Sen, Founder & Master Grower".
     * Link to '/journal/repotting-aroids-without-root-shock'.
   - Category Navigation Pills:
     * All Stories, Seasonal Care, Urban Gardening, Plant Styling, Rare Exotics, Soil & Fertilizers.
   - Article Cards Grid (3 columns desktop, 1 column mobile):
     * Cover photo with smooth zoom on hover.
     * Category tag, reading time, publication date.
     * Article title in Fraunces serif (text-xl font-medium text-[#1A3325]).
     * Short excerpt (2 lines).
     * Author avatar and name.

2. ARTICLE DETAIL PAGE ('/journal/[slug]'):
   - Header: Category pill, publication date, reading time.
   - Article Title in Fraunces serif (text-4xl sm:text-6xl font-semibold leading-tight text-[#1A3325]).
   - Author Byline with avatar: "Written by Abhay Sen · Reviewed by Nursery Specialists".
   - High-resolution hero photo with botanical caption.
   - Rich Editorial Body (Prose):
     * Beautiful typography, drop-caps on first paragraph, pull-quotes, and step-by-step numbered instructions.
   - EMBEDDED "PLANTS FEATURED IN THIS GUIDE" WIDGET:
     * Card embedded in the article showing the exact plant discussed (e.g., Monstera Deliciosa) with price (₹899), size picker, and 1-click "Add to Plant Bag" button.
   - Bottom Author Bio Box: Picture of Abhay on the rooftop nursery with bio and link to his nursery storefront.
   - "Related Guides" carousel.

Ensure 100% responsiveness on mobile, tablet, and desktop viewports.
```

---

## 📌 8.4 UPDATED MASTER EXECUTION ROADMAP

| Priority | Step / Prompt | Goal | Files Touched |
| :---: | :--- | :--- | :--- |
| **P0** | **Prompt 1** | Fix mobile horizontal slider, section gaps, and duplicate Add-to-Cart buttons. | `globals.css`, `layout.tsx`, `product-detail.tsx` |
| **P0** | **Prompt 6** | Reorder homepage (Bestsellers first), fix product links, update 360° unboxing guarantee policy, remove free delivery claims. | `page.tsx`, `bestsellers.tsx`, `guarantee-page.tsx`, `announcement-bar.tsx` |
| **P1** | **Prompt 7** | Make mobile header permanently sticky with full accessible slide drawer. | `site-header.tsx` |
| **P1** | **Prompt 2** | Add Product-Page-ONLY share button (WhatsApp, copy link with toast). | `product-detail.tsx` |
| **P2** | **Prompt 3** | User Account (`/account`), persistent order history, and Login Modal (`<AuthModal />`). | `/account/page.tsx`, `checkout-content.tsx`, `site-header.tsx` |
| **P2** | **Prompt 4** | Public Seller Storefront with Hero Logo Banner & Store Share link. | `/nurseries/[slug]/page.tsx`, `nursery-catalog.tsx` |
| **P3** | **Prompt 8** | Verified Reviews Hub (`/reviews`) and Review Submission with Nursery Replies. | `/reviews/page.tsx`, `/reviews/write/page.tsx` |
| **P3** | **Prompt 9** | Reddit-style Plant Care Q&A Community (`/community` & `/community/[slug]`). | `/community/page.tsx`, `/community/[slug]/page.tsx` |
| **P4** | **Prompt 10** | Botanical Journal & Blog (`/journal` & `/journal/[slug]`) with linked product cards. | `/journal/page.tsx`, `/journal/[slug]/page.tsx` |
| **P5** | **Prompt 5** | Site-wide micro-animations, floating toasts, and cart badge bounce. | Global components |

---

*This blueprint is saved in the root directory as `FRONTEND_POLISH_AND_MARKETPLACE_UPGRADES.md`.*
