# 先不管en_US，要求所有東西要用Unicode (UTF-8)。沒有這個的話有些環境輸
# 出時會沒辦法支援檔案名稱裡面有中文字。
export LANG=en_US.UTF-8

# 告訴 Make "clean" 等等不是檔案，只是一個指令。
.PHONY: calendar clean content-content content-css dev dev dev fmt/hugo js/組織章程

# 方便用。用 make clean 把所有 git 忽略掉的檔案清掉。
clean:
	git clean -Xdf

fmt:
	npx prettier -w **/*.css **/*.html

# 開發用。tailwind 的 --watch 模式代表它會監視 src.css 有沒有改變，如
# 果有的話就產生一個新的版本。不然平常產生一次之後就結束了。
dev-css:
	npx tailwindcss --postcss -i static/css/src.css -o static/css/built.css --watch

# 開發用。hugo server會監視各個資料夾(static/、layouts/、content/等等)
# 的內容，如果有改變的話就會重新輸出到public/去。跟上面一樣，平常它也
# 是輸出一次就結束了。
dev-hugo: content js
	hugo server --disableFastRender --poll 500ms

# 這也是開發用。concurrently是一個同時執行後面指令的程式。這樣開發時只
# 要 make dev 就可以在編輯原始碼的時候同時在網頁裡看到新的改變。
dev:
	npx concurrently "make dev-css" "make dev-hugo"

# 產生 public.zip 的方法：先產生 public，然後用 7z 把它的內容壓縮成 public.zip。
public.zip: public
	cd public/ && 7z a ../public.zip .

# 產生 public (資料夾)的方法：先產生 static/css/built.css，然後執行hugo --minify
# 單跑 hugo 指令就會把網站內容輸出到 public 這個資料夾下。--minify告訴
# 它請 Hugo 把輸出的 HTML 清乾淨一點。
public: static/css/built.css content js
	hugo --minify

# 產生 static/css/built.css 的方法：先產生 static/css/src.scss，然後叫
# tailwind 去做輸出。
#
# 因為 static/css/src.scss 是現有的檔案，Make不會再想辦法去產生它。不
# 過如果它沒有變更，static/css/built.css不需要重新產生，所以Make會跳過
# 它。
static/css/built.css: static/css/src.css
	npx tailwindcss --minify --postcss -i static/css/src.css -o static/css/built.css

# 依照assets下的檔案自動產生的頁面們
content: content/組織章程 content/calendar

# 自動為assets下每個行事曆的檔案產生一個頁面
content/calendar: static/assets/calendar
	for f in static/assets/calendar/*.pdf; do printf -- "---\ntitle: %s 社團行事曆\n---" $$(basename "$$f" .pdf) > content/calendar/$$(basename $$f .pdf).md; done

content/組織章程: static/assets/組織章程
	for f in static/assets/組織章程/*.pdf; do printf -- "---\ntitle: %s 組織章程\n---" $$(basename "$$f" .pdf) > content/組織章程/$$(basename $$f .pdf).md; done

js:
	mkdir -p static/js/
	cp node_modules/medium-zoom/dist/medium-zoom.min.js static/js/
