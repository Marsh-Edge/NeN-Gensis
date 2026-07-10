<div align="center">

# NeN-Gensis

**Free, open-source API tool hub — weather, networking, data lookup, and more.**

<p>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js">
  <img alt="React" src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss">
  <img alt="Beta" src="https://img.shields.io/badge/status-beta-orange">
</p>

<p>
  <a href="https://github.com/Marsh-Edge/nen-gensis">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/Marsh-Edge/nen-gensis?style=social">
  </a>
  <a href="https://github.com/Marsh-Edge/nen-gensis/fork">
    <img alt="GitHub Forks" src="https://img.shields.io/github/forks/Marsh-Edge/nen-gensis?style=social">
  </a>
  <a href="https://github.com/Marsh-Edge/nen-gensis/issues">
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues/Marsh-Edge/nen-gensis">
  </a>
  <a href="https://github.com/Marsh-Edge/nen-gensis/blob/main/LICENSE">
    <img alt="GitHub License" src="https://img.shields.io/github/license/Marsh-Edge/nen-gensis">
  </a>
</p>

---

[About](#-about-the-project) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Endpoints](#-api-endpoints) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## About the Project

NeN-Gensis is a free, open-source API tool hub that aggregates 19+ publicly available APIs into interactive, categorized tool pages. It serves as a one-stop destination for weather forecasts, DNS lookups, QR code generation, password generation, IP geolocation, dictionary lookups, and much more.

**No signup required. No rate limits.** Every tool is backed by server-side Next.js API routes that proxy requests to external free APIs — keeping your browser clean and your data private.

---

## Features

| Feature | Description |
|---------|-------------|
| **19+ Interactive Tools** | Weather forecasts, DNS lookups, QR codes, password generation, and more |
| **5 Categories** | General, Security & Network, Data & Knowledge, Development, Media |
| **No Signup / No Rate Limits** | Every tool is free and instantly accessible |
| **Dark / Light Theme** | Toggle between modes with persistent preference |
| **Server-Side API Routes** | All tools backed by Next.js API endpoints — no client-side API key exposure |
| **Fully Responsive** | Seamless experience across desktop, tablet, and mobile |
| **Glass Morphism UI** | Modern glass-effect design with neon glow accents |
| **Built-In API Docs** | Each tool includes a collapsible API guide with endpoints and examples |
| **Click Ripple Effect** | Subtle radial gradient animation on interactions |

---

## Tools

### General

| Tool | Description |
|------|-------------|
| [Weather](src/app/tools/weather/page.tsx) | Current weather and 3-day forecast for any city |
| [Dictionary](src/app/tools/dictionary/page.tsx) | Word definitions, phonetics, pronunciations, and examples |
| [QR Code Generator](src/app/tools/qr-code/page.tsx) | Generate QR codes from any text or URL |
| [Password Generator](src/app/tools/password-generator/page.tsx) | Create strong, secure passwords with customizable options |

### Security & Network

| Tool | Description |
|------|-------------|
| [IP Info](src/app/tools/ip-info/page.tsx) | Geolocation and network details for any IP address |
| [DNS Lookup](src/app/tools/dns-lookup/page.tsx) | Resolve A, AAAA, MX, NS, TXT, and other DNS records |
| [HTTP Header Checker](src/app/tools/header-check/page.tsx) | Inspect response headers — security, CORS, caching |

### Data & Knowledge

| Tool | Description |
|------|-------------|
| [Countries](src/app/tools/countries/page.tsx) | Search country details — capital, population, flag, and more |
| [Universities](src/app/tools/universities/page.tsx) | Find universities and colleges worldwide |
| [Book Search](src/app/tools/books/page.tsx) | Search books by title or author |
| [People in Space](src/app/tools/space/page.tsx) | See who's currently aboard the ISS and Tiangong |

### Development

| Tool | Description |
|------|-------------|
| [GitHub Profile](src/app/tools/github-profile/page.tsx) | Look up GitHub users — profile, stats, and top repos |
| [npm Lookup](src/app/tools/npm-package/page.tsx) | Inspect npm packages — version, license, dependencies |
| [PyPI Lookup](src/app/tools/pypi-package/page.tsx) | Look up Python packages on PyPI |
| [UUID Generator](src/app/tools/uuid-generator/page.tsx) | Generate UUIDs (v4) and copy to clipboard |

### Media

| Tool | Description |
|------|-------------|
| [Placeholder Images](src/app/tools/placeholder-images/page.tsx) | Random placeholder images with custom dimensions |
| [Avatar Generator](src/app/tools/avatar-generator/page.tsx) | Create avatars by seed (DiceBear, multiple styles) |
| [Color Tools](src/app/tools/color-tools/page.tsx) | Convert between HEX, RGB, HSL — preview and generate palettes |
| [Random Animals](src/app/tools/random-animal/page.tsx) | Random cat and fox images for fun and design |

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js](https://nextjs.org/) 16.2 (App Router) |
| **UI Library** | [React](https://react.dev/) 19.2 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) 4 |
| **Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Utilities** | [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge), [class-variance-authority](https://cva.style/) |
| **Linting** | [ESLint](https://eslint.org/) with `eslint-config-next` |

---

## Project Structure

```
nen-gensis/
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/                # Server-side API routes (16 endpoints)
│   │   │   ├── weather/route.ts
│   │   │   ├── dictionary/route.ts
│   │   │   ├── dns-lookup/route.ts
│   │   │   ├── ip-info/route.ts
│   │   │   ├── header-check/route.ts
│   │   │   ├── countries/route.ts
│   │   │   ├── universities/route.ts
│   │   │   ├── books/route.ts
│   │   │   ├── space/route.ts
│   │   │   ├── github-profile/route.ts
│   │   │   ├── npm-package/route.ts
│   │   │   ├── pypi-package/route.ts
│   │   │   ├── qr-code/route.ts
│   │   │   ├── placeholder/route.ts
│   │   │   ├── avatar/route.ts
│   │   │   └── random-animal/route.ts
│   │   ├── categories/         # Category listing & detail pages
│   │   ├── tools/              # 19 individual tool pages
│   │   ├── about/              # About page
│   │   ├── layout.tsx          # Root layout (sidebar, topbar, theme)
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles, theme variables
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives (shadcn/ui)
│   │   └── *.tsx               # Tool widgets & layout components
│   └── lib/
│       ├── constants.ts        # Categories, tools, helper functions
│       ├── types.ts            # TypeScript interfaces
│       ├── icons.tsx           # Icon mappings
│       └── utils.ts            # Shared utilities
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json
└── LICENSE
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/Marsh-Edge/nen-gensis.git

# Navigate into the project
cd nen-gensis

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the project for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint checks |

---

## Configuration

No environment variables are required. All external APIs used are free and keyless. The application works out of the box after `npm install`.

---

## API Endpoints

All tools are backed by server-side Next.js API routes. Most endpoints accept a `POST` request with a JSON body and return normalized JSON responses.

| Endpoint | Method | Parameters | Description |
|----------|--------|------------|-------------|
| `/api/weather` | `POST` | `{ city }` | Weather and 3-day forecast |
| `/api/dictionary` | `POST` | `{ word }` | Word definitions and phonetics |
| `/api/dns-lookup` | `POST` | `{ domain, type }` | DNS record resolution |
| `/api/ip-info` | `POST` | `{ ip }` | IP geolocation data |
| `/api/header-check` | `POST` | `{ url }` | HTTP response headers |
| `/api/countries` | `POST` | `{ search }` | Country information |
| `/api/universities` | `POST` | `{ name, country? }` | University search |
| `/api/books` | `POST` | `{ q }` | Book search via Open Library |
| `/api/space` | `GET` | — | People currently in space |
| `/api/github-profile` | `POST` | `{ username }` | GitHub profile and repos |
| `/api/npm-package` | `POST` | `{ name }` | npm package metadata |
| `/api/pypi-package` | `POST` | `{ name }` | PyPI package metadata |
| `/api/qr-code` | `POST` | `{ text, size? }` | QR code image generation |
| `/api/placeholder` | `POST` | `{ width, height }` | Placeholder image URL |
| `/api/avatar` | `POST` | `{ seed, style? }` | DiceBear avatar SVG |
| `/api/random-animal` | `POST` | `{ type }` | Random cat or fox image |

---

## Roadmap

### Completed

- [x] Core project structure and homepage
- [x] Weather API integration
- [x] All 19 tools implemented
- [x] Server-side API routes with response normalization
- [x] Dark / light theme support
- [x] Responsive design (desktop + mobile)
- [x] Built-in API documentation per tool

### Upcoming

- [ ] Favorite / pin frequently used tools
- [ ] Tool history and recent searches
- [ ] Internationalization (i18n) support
- [ ] Additional API integrations
- [ ] Unit and integration tests
- [ ] Performance optimizations and caching layer
- [ ] PWA support for offline access

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you'd like to change.

---

## License

[MIT](LICENSE) — Copyright (c) 2026 Edge Quantum

---

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- All the free public APIs that power these tools

---

<div align="center">

Built by [Marsh-Edge](https://github.com/Marsh-Edge)

</div>
