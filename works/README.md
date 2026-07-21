# 施工実績ページの追加手順

新しい現場写真とメモがあれば、以下の手順で1案件＝1ページを追加できます。Claude Codeに「この写真とメモでworksページを作って」と頼めば、この手順に沿って自動生成できます。

## 1. 写真を配置する

`images/works/` フォルダに、施工前・施工後の写真を以下の命名規則で配置します。

```
images/works/【案件を表す短い英数字】-before.jpg
images/works/【案件を表す短い英数字】-after.jpg
```

例：大野のフローリング補修なら `oono-flooring-before.jpg` / `oono-flooring-after.jpg`

## 2. メモを用意する

以下の項目を数行で用意してください（分かる範囲でOK、不明な項目は「未定」でも構いません）。

- 施工場所（市町名まで。例：広島県廿日市市大野）
- 工種（住宅リペア／コンクリート・インフラ補修／足場・解体／石綿事前調査）
- 症状（現地で見つかった状態）
- 原因（分かれば）
- 施工内容（何をしたか）
- 使用材料（分かれば）
- 所要時間・費用目安

## 3. TEMPLATE.html をコピーして編集する

`works/TEMPLATE.html` をコピーし、`works/【ファイル名】.html` として保存します。ファイル内の `【　】` で囲まれた部分をすべて実際の内容に書き換えます。

- title・meta description・og系タグ：地域名+工種を含める
- canonical / og:url：ファイル名に合わせる
- 写真パス：手順1で配置したファイル名に合わせる
- h1・案件概要（施工場所／工種／所要時間／費用目安）
- 症状／原因／施工内容／使用材料の本文

## 4. works.html に一覧カードを追加する

`works.html` の `.works-grid` 内に、他のカードと同じ形式でカードを追加し、`<h3>` から新しく作ったページへリンクします。

```html
<div class="work-card" data-category="住宅リペア">
  <div class="work-img ba-wrap">
    <div class="ba-item"><img src="images/works/【ファイル名】-before.jpg" alt="【工種】の施工前" loading="lazy" width="300" height="200"><span class="ba-label ba-before">BEFORE</span></div>
    <div class="ba-item"><img src="images/works/【ファイル名】-after.jpg" alt="【工種】の施工後" loading="lazy" width="300" height="200"><span class="ba-label ba-after">AFTER</span></div>
  </div>
  <div class="work-body">
    <span class="work-tag">住宅リペア</span>
    <h3><a href="works/【ファイル名】.html">【案件名】</a></h3>
    <p>2026年</p>
  </div>
</div>
```

`data-category` は既存のフィルターボタン（住宅リペア／インフラ補修／石綿調査）のいずれかに合わせます。

## 5. sitemap.xml に追加する

`sitemap.xml` に以下の形式で1行追加します（priorityは他の実績ページと同じ0.6程度でOK）。

```xml
<url>
  <loc>https://k-handworks.com/works/【ファイル名】.html</loc>
  <priority>0.6</priority>
</url>
```

## 「デザイン・その他対応実績」カテゴリを追加する場合

横断幕デザイン（ミヤモト・タツミ・藤井工業など）のような周辺業務の実績を載せる場合は、
`works.html` のフィルターボタンに `<button class="filter-btn" data-filter="デザイン・その他">デザイン・その他</button>` を追加し、
カードの `data-category` と `work-tag` を「デザイン・その他」にして、上記と同じ手順でページを作成してください。

## 公開前の注意

- 実際の施工場所・費用・所要時間など、事実確認が必要な項目はプレースホルダのまま公開しないこと
- お客様の了承を得た写真のみ掲載すること
