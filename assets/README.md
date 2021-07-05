# <https://nkust-dcc.github.io/> 用的大檔案

# 檔案大小

這裡的目的不是要當高畫質的儲存空間，而且[GitHub Pages的總空間只有1GB](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)。原檔都在內部的資料夾裡。

把目前資料夾的圖片縮小到高=1080：

```sh
mkdir smaller
parallel gm convert '{}' -resize x1080 smaller/'{}' ::: *.jpg
mv smaller/*.jpg .
rm smaller -r
```

`20181225/*.jpg`這樣做完之後從64M直接壓到剩3.4M。品質以1080p螢幕上來說是沒有問題的；4K我不確定，但我們真的沒有那個空間。
