# Apple Maps URL Generator

[![Deploy to Cloudflare Pages](https://static.cloudflareinsights.com/pages/v1/button.svg)](https://developers.cloudflare.com/pages/get-started/)

A powerful web tool that lets you easily generate custom Apple Maps URLs.

Whether you're a developer needing to embed maps in your application, or a marketer wanting to share specific locations for an event, this tool meets your needs. Plus, it seamlessly converts Google Maps sharing URLs into Apple Maps format.

Supports multiple languages: English, 日本語, 繁體中文.
[日本語](README.ja.md) | [繁體中文](README.zh-TW.md)

<!-- Insert a GIF demo or screenshot here to show the tool in action -->
<!-- ![Demo GIF](path/to/your/demo.gif) -->

## ✨ Key Features

- **Comprehensive Parameter Support**: Supports all major Apple Maps URL scheme parameters, including:
  - `ll`: Center point latitude and longitude
  - `q`: Search query
  - `address`: Detailed address information
  - `z`: Zoom level
  - `t`: Map type (standard `m`, satellite `k`, transit `r`)
  - `saddr` & `daddr`: Navigation start and destination addresses
- **Google Maps URL Conversion**: Automatically detects Google Maps sharing URLs (e.g., `https://maps.app.goo.gl/...`) from your clipboard, parsing them into a location name and coordinates for quick conversion.
- **Interactive Map Preview**: With the built-in Leaflet.js map, you can click to select a location or see a real-time preview of your configured parameters.
- **Real-time Generation & Copy**: The URL updates in real-time as you adjust any parameter, with a one-click copy feature.
- **Internationalized Interface**: Available in English, Japanese, and Traditional Chinese to accommodate users from different regions.

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Map**: [Leaflet.js](https://leafletjs.com/)
- **Internationalization**: [svelte-i18n](https://github.com/cibernox/svelte-i18n)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 🚀 Development and Deployment

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/apple-maps-url-gen.git
   cd apple-maps-url-gen
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:5173`.

### Formatting and Checking

- **Format code**:

  ```bash
  npm run format
  ```

- **Type-check**:

  ```bash
  npm run check
  ```

### Deployment

This project is configured for easy deployment to [Cloudflare Pages](https://pages.cloudflare.com/).

1. Push your code to your GitHub repository.
2. In the Cloudflare Pages dashboard, link your GitHub repository.
3. Use the following build settings:
   - **Framework Preset**: `SvelteKit`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `.svelte-kit/cloudflare`

Cloudflare Pages will automatically build and deploy your site whenever you push to the `main` branch.

## 🤝 Contributing

Contributions of any kind are welcome! If you have suggestions, find a bug, or want to add a new feature, feel free to open an issue or send a pull request.

Before sending a pull request, please ensure you have run `npm run format` and `npm run check`.
