# Decentralized Developer Portfolio

A responsive developer portfolio website custom-built for Shaig Mahmudov. The frontend features a dark-gray and gold design system with ambient glows, scroll telemetry, and an interactive backend load testing simulator. It is optimized for distributed networks and prepared for deployment on IPFS.

## Project Structure and Architecture

The application is structured as a single-page React web application built with Vite and TypeScript.

- **Hero Section**: Introduces the developer with an animated typing terminal highlighting core engineering roles.
- **About Section**: Presents developer background details, learning focuses, and links to the resume document.
- **Technical Arsenal**: Displays skills categorized by domain (core backend, persistence, security, databases, devops, and additional frameworks).
- **Projects Showcase**: Dynamically lists key repositories including rivet-api, wreckr, autoreq, betelgeuse-core, orion-platform, and m42-infra.
- **Backend Load Simulator**: An interactive environment simulating HTTP requests, success rates, and latencies on a live telemetry graph, mimicking backend testing concepts.
- **Contact Portal**: Provides a messaging form and direct integration links with social media.

## Technology Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: GitHub Actions & IPFS Pinata Pinning

## Local Development

### Prerequisites

Ensure you have Node.js (version 20 or higher) and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shaig-mahmudov/decentralized-portfolio.git
   cd decentralized-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build the static assets for production:
   ```bash
   npm run build
   ```
   The compiled assets will be output to the `dist` directory.

## CI/CD Pipeline

The project includes an automated deployment workflow configured in GitHub Actions. Upon a push to the main branch, the pipeline:
1. Checks out the repository code.
2. Installs the npm packages and builds the production bundle.
3. Pins the compiled static directory to IPFS via the Pinata API.
