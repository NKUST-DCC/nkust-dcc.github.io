# Partials

類似函數的東西。

像這樣用：

```
{{partial "cura" (dict "ctx" . "href" "/about/" "text" "關於")}}
```

這會使用這個資料夾裡叫做cura.html的partial。

這個partial的用意是要讓目前正在看的頁面的選項變成粗體。