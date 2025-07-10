# Apple Maps URLジェネレーター

[![Deploy to Cloudflare Pages](https://static.cloudflareinsights.com/pages/v1/button.svg)](https://developers.cloudflare.com/pages/get-started/)

カスタムApple Maps URLを簡単に生成できる、強力なウェブツールです。

アプリケーションに地図を埋め込む必要がある開発者や、イベントで特定の場所を共有したいマーケティング担当者など、このツールはあなたのニーズに応えます。さらに、Google Mapsの共有URLをApple Maps形式にシームレスに変換することも可能です。

多言語対応：English, 日本語, 繁體中文。
[English](README.md) | [繁體中文](README.zh-TW.md)

<!-- GIFデモやスクリーンショットをここに挿入してツールの動作を示します -->
<!-- ![Demo GIF](path/to/your/demo.gif) -->

## ✨ 主な機能

- **包括的なパラメータサポート**：以下を含む、すべての主要なApple Maps URLスキームパラメータをサポートします：
  - `ll`：中心点の緯度経度
  - `q`：検索キーワード
  - `address`：住所詳細
  - `z`：ズームレベル
  - `t`：地図の種類（標準 `m`, 衛星 `k`, 交通機関 `r`）
  - `saddr` & `daddr`：ナビゲーションの出発地と目的地
- **Google Maps URL変換**：クリップボードにあるGoogle Mapsの共有URL（例：`https://maps.app.goo.gl/...`）を自動的に検出し、場所の名前と緯度経度に解析して、迅速な変換をサポートします。
- **インタラクティブな地図プレビュー**：内蔵のLeaflet.jsマップで、地図上をクリックして場所を選択したり、設定したパラメータに対応する地図ビューをリアルタイムで確認したりできます。
- **リアルタイム生成とコピー**：パラメータを調整するとURLがリアルタイムで更新され、ワンクリックでコピーする機能を提供します。
- **国際化されたインターフェース**：英語、日本語、繁体字中国語のインターフェースを提供し、さまざまな言語のユーザーが利用できます。

## 🛠️ 技術スタック

- **フレームワーク**: [SvelteKit](https://kit.svelte.dev/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **マップ**: [Leaflet.js](https://leafletjs.com/)
- **国際化**: [svelte-i18n](https://github.com/cibernox/svelte-i18n)
- **デプロイ**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 🚀 開発とデプロイ

### ローカルでの開発

1. リポジトリをクローンします：

   ```bash
   git clone https://github.com/your-username/apple-maps-url-gen.git
   cd apple-maps-url-gen
   ```

2. 依存関係をインストールします：

   ```bash
   npm install
   ```

3. 開発サーバーを起動します：

   ```bash
   npm run dev
   ```

   アプリケーションは `http://localhost:5173` で実行されます。

### フォーマットとチェック

- **コードのフォーマット**:

  ```bash
  npm run format
  ```

- **型チェック**:

  ```bash
  npm run check
  ```

### デプロイ

このプロジェクトは、[Cloudflare Pages](https://pages.cloudflare.com/) に簡単にデプロイできるように設定されています。

1. あなたのコードをGitHubリポジトリにプッシュします。
2. Cloudflare Pagesのダッシュボードで、あなたのGitHubリポジトリをリンクします。
3. 以下のビルド設定を使用します：
   - **フレームワークプリセット**: `SvelteKit`
   - **ビルドコマンド**: `npm run build`
   - **ビルド出力ディレクトリ**: `.svelte-kit/cloudflare`

`main`ブランチにプッシュするたびに、Cloudflare Pagesが自動的にビルドとデプロイを行います。

## 🤝 貢献

あらゆる形式の貢献を歓迎します！提案、バグの発見、新機能の追加などがあれば、気軽にIssueを開くか、Pull Requestを送ってください。

Pull Requestを送る前に、`npm run format` と `npm run check` を実行したことを確認してください。
