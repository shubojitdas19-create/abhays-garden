# 🌿 ABHAY'S ROOF GARDEN — MASTER UX, BUG FIXES & SYSTEM UPGRADES BLUEPRINT

> **DOCUMENT PURPOSE:**  
> This document is the complete master audit and actionable implementation guide for polishing the entire **Abhay's Roof Garden** frontend.  
> It covers every bug, layout glitch, missing user flow (User Account, Order Tracking & Login), product-only share feature, and mobile horizontal slider fix.  
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
| **Announcement Bar** | Smooth vertical fade transition rotating between 2 curated messages every 4 seconds. |
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
| **`/checkout`** | Orders placed are not saved for later retrieval. | Save placed order into `localStorage` so it appears in `/account`. |
| **`/nurseries/[slug]`** | Nursery logo is missing from cover banner. | Anchor nursery avatar badge at bottom-left of cover photo. |
| **`/nurseries/[slug]`** | No way for sellers to share their store URL. | Add "Share Nursery" button with Web Share API and Copy Link toast. |
| **`product-card.tsx`**| Missing nursery attribution on cards. | Add `🌱 Grown by [Nursery Name]` clickable link below title. |

---

## 📋 6. READY-TO-COPY VERCEL / V0 PROMPTS

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

## 📌 7. RECOMMENDED STEP-BY-STEP EXECUTION ORDER

| Step | Action | Focus Area |
| :---: | :--- | :--- |
| **1** | **Run Prompt 1** | Fixes the mobile horizontal slider overflow, eliminates the blank space before the footer, and fixes the duplicate Add-to-Cart buttons. |
| **2** | **Run Prompt 2** | Adds the dedicated "Share Plant" button to the Product Detail Page ONLY. |
| **3** | **Run Prompt 3** | Builds the User Account (`/account`), persistent Order History, and Login Modal. |
| **4** | **Run Prompt 4** | Adds the Nursery Logo Hero Banner and Storefront Share link to `/nurseries/[slug]`. |
| **5** | **Run Prompt 5** | Adds rich toast notifications, cart bounce animations, and polished carousels. |

---

*This blueprint is saved in the root directory as `FRONTEND_POLISH_AND_MARKETPLACE_UPGRADES.md`.*
