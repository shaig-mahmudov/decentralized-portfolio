# 👑 Decentralized Portfolio

A premium, state-of-the-art developer portfolio website custom-built for **Shaig Mahmudov**. The frontend features a luxury dark-gray and gold design system with ambient glows, scroll telemetry, and an interactive backend load testing simulator. Optimized for distributed networks and fully prepared for deployment on **IPFS (Fleek / Pinata)**.

---

## 🎨 Design System & Aesthetic
- **Ambient Lighting**: Fixed radial gold glows and cursor-reactive mouse glow tracking to create a premium visual experience.
- **Typography**: Editorial heading typography using *Cinzel* paired with *Outfit* for modern, clean body text.
- **Glassmorphic Layout**: Frosted glass panels with glowing gold border transitions on hover states.
- **Visual telemetry**: Circular profile picture frames with nested gold gradient borders.

---

## 🚀 Key Features

### 1. Interactive Load Test Simulator
Inspired by backend systems resilience projects like `wreckr` and `autoreq`, the simulator features a control console to:
- Select endpoint destinations and slide request rates (RPS).
- Inject traffic spikes (2.5x load multiplier) and force rate limits (HTTP 429).
- View live performance charts (plotted using Recharts) mapping request latency and success rate.
- Scroll through a live-running console logger outputting system telemetry data.

### 2. Featured Projects Grid
Cards detailing top GitHub repositories (`rivet-api`, `wreckr`, `autoreq`, `betelgeuse-core`, `orion-platform`, `m42-infra`), complete with:
- Live language statistics and color badges.
- Star counts and direct source repository links.
- Organization labels highlighting contributions to **M42 Labs**.

### 3. Integrated Resume and Contact Portal
- Floating input fields with dynamic submit response states.
- Custom connections to GitHub and verified LinkedIn posts.
- Direct CV downloading served directly from IPFS static assets.

---

## 🛠️ Technology Stack
- **Core Framework**: React (Vite & TypeScript)
- **Styling**: Tailwind CSS v4 (native stylesheet compilation)
- **Telemetry Graph**: Recharts (fully responsive SVG canvas charts)
- **Vector Icons**: Lucide React
- **CI/CD Deployment**: GitHub Actions & IPFS Pinata Pinning

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/shaig-mahmudov/decentralized-portfolio.git
cd decentralized-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production (compiling static files for IPFS deployment)
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.

---

## 🌐 CI/CD & IPFS Deployment

This repository includes a GitHub Actions CI/CD workflow to compile the application and pin the static output to **IPFS via Pinata** on every push to the `main` branch.

### Deployment Configuration
The workflow checks out the repository, installs project dependencies, triggers `npm run build`, and pins the generated `dist/` folder.

#### Secrets required in GitHub Settings:
To enable automated deployments, configure the following secrets in your GitHub repository:
- `PINATA_API_KEY`: Your Pinata API authentication key.
- `PINATA_SECRET_API_KEY`: Your Pinata API secret key.
