# Apple Maps URL Generator

[![Deploy to Cloudflare Pages](https://static.cloudflareinsights.com/pages/v1/button.svg)](https://developers.cloudflare.com/pages/get-started/)

一個功能強大的網頁工具，讓您輕鬆產生自訂的 Apple Maps URL。

無論您是開發者需要在應用程式中嵌入地圖，或是行銷人員想在活動中分享特定地點，
這個工具都能滿足您的需求。此外，它還能無縫地將 Google Maps 的分享網址轉換為
Apple Maps 格式。

支援多國語言：English, 日本語, 繁體中文。
[English](README.md) | [日本語](README.ja.md)

<!-- 在這裡插入一個 GIF 動圖或螢幕截圖來展示工具操作 -->
<!-- ![Demo GIF](path/to/your/demo.gif) -->

## ✨ 主要功能

- **全面的參數支援**：支援所有 Apple Maps URL scheme 的主要參數，包括：
  - `ll`：中心點經緯度
  - `q`：搜尋關鍵字
  - `address`：地址詳細資訊
  - `z`：縮放等級
  - `t`：地圖類型 (標準 `m`, 衛星 `k`, 公共交通 `r`)
  - `saddr` & `daddr`：導航起點和終點
- **Google Maps 網址轉換**：自動偵測剪貼簿中的 Google Maps 分享網址
  (例如 `https://maps.app.goo.gl/...`)，並將其解析為地點名稱和經緯度，
  方便您快速轉換。
- **互動式地圖預覽**：內建 Leaflet.js 地圖，您可以直接在地圖上點擊選擇地點，
  或即時查看您所設定參數對應的地圖畫面。
- **即時產生與複製**：URL 會在您調整任何參數時即時更新，並提供一鍵複製功能。
- **國際化介面**：提供英文、日文、繁體中文介面，方便不同語言的使用者。

## 🛠️ 技術棧

- **框架**: [SvelteKit](https://kit.svelte.dev/)
- **樣式**: [Tailwind CSS](https://tailwindcss.com/)
- **地圖**: [Leaflet.js](https://leafletjs.com/)
- **國際化**: [svelte-i18n](https://github.com/cibernox/svelte-i18n)
- **部署**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 🚀 開發與部署

### 在本機開發

1. 複製專案庫：

   ```bash
   git clone https://github.com/your-username/apple-maps-url-gen.git
   cd apple-maps-url-gen
   ```

2. 安裝依賴套件：

   ```bash
   npm install
   ```

3. 啟動開發伺服器：

   ```bash
   npm run dev
   ```

   應用程式將會執行在 `http://localhost:5173`。

### 格式化與檢查

- **格式化程式碼**:

  ```bash
  npm run format
  ```

- **型別檢查**:

  ```bash
  npm run check
  ```

### 部署

這個專案已設定為可輕鬆部署至 [Cloudflare Pages](https://pages.cloudflare.com/)。

1. 推送您的程式碼至 GitHub 儲存庫。
2. 在 Cloudflare Pages 儀表板中，連結您的 GitHub 儲存庫。
3. 使用以下建置設定：
   - **框架預設**: `SvelteKit`
   - **建置指令**: `npm run build`
   - **建置輸出目錄**: `.svelte-kit/cloudflare`

Cloudflare Pages 將會在您每次推送至 `main` 分支時自動建置與部署。

## 🤝 貢獻

歡迎任何形式的貢獻！如果您有任何建議、發現錯誤或想新增功能，請隨時開一個 Issue 或發送 Pull Request。

在發送 Pull Request 前，請確認您已執行 `npm run format` 和 `npm run check`。
