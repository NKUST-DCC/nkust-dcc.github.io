# Hugo data 資料夾

官方文件：[Hugo: Data Templates](https://gohugo.io/templates/data-templates/).

Hugo會讀取這個資料夾下的YAML、JSON、和TOML檔案，然後在template內就可以使用檔案內的資料。

從template可以這樣寫：

```
{{ hugo.Data.<key...> }}
```

- `(site)`代表的是整個網站的物件。如果看得到`.Site`的話也可以用。
- `<key...>`可以走進data下的資料夾，也可以走進一個檔案內的dictionary
  - 舉例來說，`hugo.幹部.一一〇`可以是指`/data/幹部/一一〇.yaml`這個檔案
  - 也可以是指`/data/幹部.json`這個檔案裡面`一一〇`這個key的內容。

另外一種寫法是用[`index`](https://gohugo.io/functions/index-function/)。用`index`的時候key可以是執行的時候計算出來的，並且可以包含空格或是用數字開頭等等。

```
{{ index hugo.Data "key1" "key2" }} 等同 {{ hugo.Data.key1.key2 }}

沒問題：{{ index hugo.Data "幹部" "110" }}
會報錯：{{ index hugo.Data.幹部.110 }}
```

用`index`的時候，如果它跳錯誤訊息說 “error calling index: index of nil pointer”，那代表有些key不在實際的資料裡面。對，這個錯誤訊息非常沒用。
