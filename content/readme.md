# Content 資料夾

這裡的各個檔案，除了被忽略掉的`README.md`以外，都代表一個輸出後的頁面。

例如`about.md`會輸出成<https://nkust-dcc.github.io/about>。

## `_index.md`是一個例外

- `about/_index.md`也會輸出成<https://nkust-dcc.github.io/about>。
- 這個資料夾的`_index.md`會輸出成首頁的內容。

## 前綴資料

這裡每個檔案都可以提供一些前綴資料，這樣在`layouts/`的模板裡比較容易處理它們。

前綴資料要這樣寫：

```
---
title: 標題
---
```
