# static: 原封不動直接複製的檔案

Hugo會把這個資料夾下的所有檔案原封不動的複製到輸出的資料夾。

# gh-pages

目前我所利用的GitHub Actions腳本會輸出之後把內容推到gh-pages這個(獨立的)分支，而這個檔案也會跟著出現在那。

# 產生 favicon.ico

如果我們修icon的話：

```
magick icon.png -resize 32x32 favicon.ico
```
