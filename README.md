# Four Seasons Studio

Artist portfolio and e-commerce website for Four Seasons Studio — original fine art paintings by Christine. Built with Nuxt 4 and Vue 3.

**Live site:** [fourseasonsstudio.com](https://fourseasonsstudio.com)

## Tech Stack

- **Framework:** Nuxt 4 / Vue 3 (Composition API)
- **CMS:** Sanity (headless, real-time content updates)
- **Payments:** Stripe Checkout (redirect flow)
- **Email:** Resend (purchase confirmations, sale notifications, contact form)
- **Hosting:** Cloudflare Pages
- **Domain:** Cloudflare Registrar

## Features

- Single-page layout with smooth-scroll navigation
- Painting gallery with category filtering (landscape, still life, study)
- Shop section with live pricing and availability
- Stripe Checkout for purchasing paintings
- Webhook-driven post-purchase automation:
  - Marks painting as sold in Sanity
  - Sends buyer a confirmation email
  - Sends seller a sale notification email
- Contact form with inquiry types (general, purchase, commission)
- Responsive design with a single breakpoint at 768px

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

### Sanity Studio

```bash
cd studio
npm install
npm run dev
```

Sanity Studio runs at http://localhost:3333.

### Environment Variables

Create a `.env` file in the project root:

```
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
SELLER_EMAIL=seller@example.com
SANITY_API_TOKEN=sk...
```

### Local Webhook Testing

Install the [Stripe CLI](https://stripe.com/docs/stripe-cli), then:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

Use test card `4242 4242 4242 4242` with any future expiry and any CVC.

## Project Structure

```
app/
  components/     Vue components (NavBar, Gallery, Shop, etc.)
  composables/    usePaintings() — fetches from Sanity with mock fallback
  data/           Mock painting data for local development
  pages/          index.vue (main page), success.vue (post-purchase)
  assets/css/     Global styles and CSS custom properties
server/
  api/            Server routes (checkout, webhook, contact)
  utils/          Sanity write client
studio/           Sanity Studio (separate package)
```

## Deployment

Pushes to `main` auto-deploy via Cloudflare Pages. Environment variables are configured in the Cloudflare Pages dashboard under Settings > Environment variables.
