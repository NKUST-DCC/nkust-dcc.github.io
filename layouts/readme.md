# Layouts: 頁面輸出前的模板

Content內出來的各個頁面會先進到這個資料夾的各個模板裡。

Hugo大致上有兩種頁面：列表(list)和單頁(single)。在列表的模板裡，屬於那個列表的頁面會儲存在一個變數裡，然後那個模板就可以為每個頁面產生它相對應的HTML。

先經過list.html或single.html之後各個頁面會再進到baseof.html。`_default/baseof.html`可以當成是整個網站最根本的模板。

- layouts/index.html: 主頁的模板
- layouts/\<種類\>/single.html: 單頁的模板
- layouts/\<種類\>/list.html: 列表的模板

種類：

- `content/foo/bar.md`的種類 (Hugo 把它叫做 “Kind”) 是`foo` (資料夾)
- 沒有種類專屬的模板的時候會使用`_default`
