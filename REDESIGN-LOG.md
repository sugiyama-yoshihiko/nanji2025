# NANJI 乃 - Redesign Work Log

作業開始: 2026-09-08 02:40 JST頃
目標完成: 2026-09-08 09:40 JST（起床予定10:00の20分前）
プレビュー URL: https://nanji2025.com/preview/
本番 URL（無傷）: https://nanji2025.com/

---

## 前提

- **参考サイト**: Fondazione Prada（構成・タイポ・静けさ） × M+ Hong Kong（動き・カード・バイリンガル）
- **ユーザー指定**: 白背景、Prada/M+ 系フォント、キュラトリアルスペース像の情報増補
- **公開方針**: `/preview/` に構築、本番切替は起床後の承認後
- **メール通知**: ollcommunities37@gmail.com（作業マイルストーンごと）

---

## 完全解析結果

### Fondazione Prada（実ブラウザ計測）
- 背景: `rgb(255,255,255)` = 純白
- テキスト: `rgb(0,0,0)` = 純黒
- 書体: `StrongFontHeavy` (neuzeitsheavy-book) / `StrongFont` (neuzeits-book) — Neuzeit Grotesk family
- H1: 100px, letter-spacing -5.6px, line-height 90px, UPPERCASE, weight 400
- Body: 14px / 17px line-height
- 段落: 15px / 24px, sans-serif fallback
- リンク: `underline` デフォルト（クラシック Web タイポ）
- ナビ: `VISITA / PROGETTI / Permanenti / Futuri / Online / Archivio` — 大文字混在

### M+ Hong Kong（実ブラウザ計測）
- 書体: `Simplistic` (custom Mplus family) — 幾何学グロテスク
- バイリンガル: EN + 繁体中文を必ず併記（例: `Exhibitions / 展覽`）
- カード: 明るいアクセントカラー（例: `rgb(255,92,15)` = オレンジ）を CTA に使用
- 構造: Hero → Plan Your Visit / See What's On / Become Member（3カード）→ Exhibitions → Events → Magazine → Collection Online → Cinema → Facade → Membership
- ナビ: `The Building / Exhibitions / Collection Online / M+ Magazine`
- Sub-nav: `Plan Your Visit / See What's On / Become a Member`

### 統合設計判断
- **背景**: `#FFFFFF` 純白（両ref共通）
- **書体**: 
  - Inter（Neuzeit 系の幾何学サンス、Google Fonts無料）
  - Noto Sans JP（日本語、幾何学的）
  - Simplistic の代替として最も近い
- **アクセント色**: オレンジ `#FF5C0F`（M+ 直参照）、深緑 `#0E4C40`（少数使用）
- **タイポ**: UPPERCASE / tight tracking / 大サイズ H1
- **リンク**: `underline` デフォルト（Prada 継承）
- **カード**: M+ の CTA 3枚構造を採用
- **バイリンガル**: EN 主・JP 副として全セクションに併記

---

## 作業ログ

### [DONE] v1 プレビュー（廃案）
- 時刻: 03:00頃
- 内容: warm ivory 背景 + Serif 装飾主導 + N° 番号
- 結果: **ユーザー否定** — 「白背景がいい、フォントも全然違う、全然良くない」
- 学び: 温かみより純白＆現代的、装飾より情報密度、Serif より幾何学 Sans

### [DONE] 両サイト実ブラウザ完全解析
- 時刻: 03:20頃
- ツール: mcp__Claude_Browser__javascript_tool でcomputed style と @font-face を実測
- 結果: 上記「完全解析結果」の通り

### [DONE] v2 プレビュー公開
- 時刻: 04:00頃
- コミット: `6035d15` "Redesign preview v2: pure white + Inter, M+ x Prada synthesis"
- URL: https://nanji2025.com/preview/
- 主な変更:
  - 背景: `#FFFFFF` 純白
  - 書体: Inter（EN） + Noto Sans JP（JP）、ウェイト400-800
  - Hero: 大画面画像 + `Unearth the everyday. / 伊賀のいとなみを、ものの温度へ。` + 底部に3情報ブロック（NOW / LOCATION / HOURS）
  - CTA 3カード: Visit（白）／ See What's On（オレンジ）／ Open Call（黒）— M+ 直参照
  - Statement: 引用 + 本文の2カラム
  - Curator: モノクロポートレート + プロフィール
  - Programme: Cool 01-04 表形式（Prada dense table）
  - Space: 12カラムグリッドで7枚配置
  - Archive: date-title-type の index リスト（Prada 継承）
  - Journal: note記事の抜粋リスト
  - Neighborhood: 2枚カード（一乃湯・伊賀スポット）
  - Store: BASE 商品ウィジェット（自動同期継続）
  - Visit: 住所・時間・連絡先 + Google Map
  - Footer: ブランド + 3カラムリンク + copyright

### [検討中] 追加ブラッシュアップ（起床までに）
- PortableSSD `/Volumes/PortableSSD/展示記録集/一乃湯/` から:
  - `会場の写真` → Space セクション差替候補
  - `セラミカルパレード冊子_掲載用写真` → Archive カード差替候補
  - `展示別データ/*` → Now on view / Archive の詳細画像
  - `フィルム` → 撮影者不明のため使用しない（後日名称確定後）
- 色調・アニメーション速度の微調整
- モバイル表示の最終確認

---

## 起床後にご確認いただきたいこと

1. **プレビューを開く**: https://nanji2025.com/preview/ （SafariでもChromeでも可）
2. **確認観点**:
   - 方向性（M+ × Prada 系の白 × 幾何学サンス）が意図と合っているか
   - Hero のコピー・タグライン
   - CTA 3カードの中身（Visit / See What's On / Open Call）
   - Statement / Curator / Programme の文言
   - Archive / Journal のリスト表示
   - 全体の余白・タイポの重さ・動きの速度
3. **フィードバック**:
   - このまま本番昇格 → 「preview を本番にして」とご返信
   - 修正必要 → 具体的にお伝えください（色／文言／構成／セクション追加削除）

---

## リポジトリ

- GitHub: https://github.com/sugiyama-yoshihiko/nanji2025
- ブランチ: main（プレビューは main の `/preview/` サブディレクトリ）
- 本番切替の手順（承認後私が実施）:
  1. `preview/index.html` の中身を `index.html` にコピー
  2. `preview/` は削除しない（履歴として残す）
  3. commit → push → 自動デプロイ
