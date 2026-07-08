# NeN-Gensis

**Free, open-source API tool hub — weather, networking, data lookup, and more.**

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js">
  <img alt="React" src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss">
</p>

---

## ✨ Features

- **19+ interactive API tools** — weather forecasts, DNS lookups, QR codes, password generation, and more
- **5 categories** — General, Security & Network, Data & Knowledge, Development, Media
- **No signup, no rate limits** — every tool is free and open to use instantly
- **Dark / light theme** — toggle between modes with a single click
- **Built-in API routes** — all tools backed by server-side Next.js API endpoints
- **Fully responsive** — works seamlessly across desktop, tablet, and mobile

---

## 🛠 Tools

### 🌐 General

| Tool | Description |
|------|-------------|
| [Weather](src/app/tools/weather) | Current weather and 3-day forecast for any city |
| [Dictionary](src/app/tools/dictionary) | Word definitions, phonetics, pronunciations, and examples |
| [QR Code Generator](src/app/tools/qr-code) | Generate QR codes from any text or URL |
| [Password Generator](src/app/tools/password-generator) | Create strong, secure passwords with customizable options |

### 🔒 Security & Network

| Tool | Description |
|------|-------------|
| [IP Info](src/app/tools/ip-info) | Geolocation and network details for any IP address |
| [DNS Lookup](src/app/tools/dns-lookup) | Resolve A, AAAA, MX, NS, TXT, and other DNS records |
| [HTTP Header Checker](src/app/tools/header-check) | Inspect response headers — security, CORS, caching |

### 📚 Data & Knowledge

| Tool | Description |
|------|-------------|
| [Countries](src/app/tools/countries) | Search country details — capital, population, flag, and more |
| [Universities](src/app/tools/universities) | Find universities and colleges worldwide |
| [Book Search](src/app/tools/books) | Search books by title or author |
| [People in Space](src/app/tools/space) | See who's currently aboard the ISS and Tiangong |

### 🛠 Development

| Tool | Description |
|------|-------------|
| [GitHub Profile](src/app/tools/github-profile) | Look up GitHub users — profile, stats, and top repos |
| [npm Lookup](src/app/tools/npm-package) | Inspect npm packages — version, license, dependencies |
| [PyPI Lookup](src/app/tools/pypi-package) | Look up Python packages on PyPI |
| [UUID Generator](src/app/tools/uuid-generator) | Generate UUIDs (v4) and copy to clipboard |

### 🎨 Media

| Tool | Description |
|------|-------------|
| [Placeholder Images](src/app/tools/placeholder-images) | Random placeholder images with custom dimensions |
| [Avatar Generator](src/app/tools/avatar-generator) | Create random avatars by seed (DiceBear, multiple styles) |
| [Color Tools](src/app/tools/color-tools) | Convert between HEX, RGB, HSL — preview and generate palettes |
| [Random Animals](src/app/tools/random-animal) | Random cat and fox images for fun and design |

---

## 🚀 Getting Started

```bash
git clone https://github.com/Marsh-Edge/nen-gensis.git
cd nen-gensis
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Project Structure

```
src/
├── app/
│   ├── api/            # Server-side API routes
│   ├── categories/     # Category listing pages
│   ├── tools/          # Individual tool pages
│   ├── about/          # About page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # Reusable UI primitives (button, card, input, etc.)
│   └── *.tsx           # Tool widgets and layout components
└── lib/
    ├── constants.ts    # Categories, tools, and utility helpers
    ├── types.ts        # TypeScript interfaces
    ├── utils.ts        # Shared utilities
    └── icons.tsx       # Icon components
```

---

## 🔌 API Endpoints

All tools are backed by server-side Next.js API routes. Each endpoint accepts a `GET` request and returns JSON:

| Endpoint | Description |
|----------|-------------|
| `/api/weather?city={city}` | Weather and forecast data |
| `/api/dictionary?word={word}` | Word definitions and phonetics |
| `/api/dns-lookup?domain={domain}&type={type}` | DNS record resolution |
| `/api/ip-info?ip={ip}` | IP geolocation data |
| `/api/header-check?url={url}` | HTTP response headers |
| `/api/countries?search={query}` | Country information |
| `/api/universities?name={name}&country={country}` | University search |
| `/api/books?q={query}` | Book search |
| `/api/space` | Current occupants in space |
| `/api/github-profile?username={username}` | GitHub profile and repos |
| `/api/npm-package?name={name}` | npm package metadata |
| `/api/pypi-package?name={name}` | PyPI package metadata |
| `/api/qr-code?text={text}&size={size}` | QR code generation |
| `/api/placeholder?width={w}&height={h}` | Placeholder image URLs |
| `/api/avatar?seed={seed}&style={style}` | Avatar SVG generation |
| `/api/random-animal?type={cat\|fox}` | Random animal images |

---

## 🧰 Tech Stack

- **Framework** — [Next.js](https://nextjs.org/) 16.2
- **UI Library** — [React](https://react.dev/) 19.2
- **Language** — [TypeScript](https://www.typescriptlang.org/) 5
- **Styling** — [Tailwind CSS](https://tailwindcss.com/) 4
- **Components** — [Radix UI](https://www.radix-ui.com/) (Dialog, ScrollArea, Separator, Slot)
- **Icons** — [Lucide React](https://lucide.dev/)
- **Utilities** — [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge), [class-variance-authority](https://cva.style/)
- **Linting** — [ESLint](https://eslint.org/) with `eslint-config-next`

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE) — Copyright (c) 2026 Edge Quantum

---

## 🙏 Acknowledgments

Built by [Marsh-Edge](https://github.com/Marsh-Edge).
