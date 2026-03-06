# The Wu Lab - Handcrafted Energy Jewelry E-commerce Platform

Welcome to The Wu Lab, a modern e-commerce platform for handcrafted energy jewelry with integrated payment processing.

## Features

- 🛍️ Beautiful product showcase with 8 handcrafted jewelry items
- 🛒 Real-time shopping cart with Zustand state management
- 💳 Stripe payment integration for credit card payments
- 🏦 PayPal payment integration
- 🎨 Responsive design with Tailwind CSS
- ⚡ Built with Next.js 14 and React 18
- 🔒 Secure backend API routes with price verification

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET_KEY=your_paypal_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
thewulab/
├── app/
│   ├── api/checkout/
│   │   ├── stripe/route.ts
│   │   └── paypal/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── success/page.tsx
├── components/
│   ├── Cart.tsx
│   └── CheckoutButton.tsx
├── lib/
│   ├── store.ts (Zustand cart state)
│   └── products.ts (Product data & price verification)
└── package.json
```

## Payment Testing

### Stripe Test Card
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

### PayPal
Use your PayPal sandbox account for testing.

## Deployment

Deployed on Vercel with automatic deployments on every push to main branch.

## License

MIT

---

Built with ❤️ by The Wu Lab Team
