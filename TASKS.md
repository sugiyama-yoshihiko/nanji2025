# 実装タスク

## 進行状況
完了 9 / 全 9    最終更新 2026-09-08 11:33

## タスク
- [x] T01 管理ファイル整備（SPEC/TASKS/PROGRESS/RESUME）
- [x] T02 デザイントークン＋共通CSS（preview/style.css）
- [x] T03 ヘッダー＋ヒーロー＋下端2バー
- [x] T04 Now on View / Statement / Curator
- [x] T05 Programme（4クール色）/ The Space / Archive
- [x] T06 Journal / Neighborhood / Store / Visit / Footer
- [x] T07 モーション実装（main.js：スタガーリビール・clip-path）
- [x] T08 レスポンシブ検証・修正（375 / 768 / 1440）
- [x] T09 最終検証＋デプロイ＋通知メール

## 詰まっている点
なし（下記の環境事象は解決済み・サイト側の不具合ではない）

## 発見して直した不具合
1. BASE同期ワークフローが preview/main.js を対象にしていなかった → 両ファイル対応に修正
2. 同期後の配列整形が `'140474987',  ];` と1行に潰れていた → 改行を保つよう修正（構文自体は有効だったが可読性のため）

## 偽陽性だった事象（記録）
- モバイルナビが開かないと一度判断 → transition 途中で getBoundingClientRect を読んでいたため。
  transition を切って再測定したところ top=54px で正常だった。
- 検証終盤、CSS/JS/画像が一切読めない状態になった → 検査ブラウザ側の外部リソース遮断。
  curl では全て 200、Google Fonts も 200。サイト側の問題ではない。
  描画検証は遮断が起きる前に 1440/768/375 の3幅すべてで完了済み。

## 既定値で進めた判断（要・事後確認）
- container を 1120px と決定（Prada の 1140 を借りないため）
- 本文色 #1A1A1A / muted #8C8C8C / 罫線 #DCDCDC は Prada 実測値を避けた自前値
- キュレーター顔写真が未支給のため photos/s-01.jpg を暫定使用（コード内に TODO 記載）
- 開催中の展覧会の会期を「2026 Autumn」と暫定表記
