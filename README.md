# 國立高雄科技大學(第一校區)夢想漫研社 官方網站

## 授權條款

程式 = MIT，其他的在合理使用以外沒有特別授權。

## 建構

```sh
make serve
```

```sh
make public
```

## 受眾?

我認為目標的讀者有

- 評鑑時的評審 (我是希望做好之後只要加新的資料就好，希望不會變成評鑑多一個東西要做)
- 有意願加入的新生或是舊生
- 社員可以秀給人說這是自己的社團活動 (給外人看)

## 更新行事曆

- 把行事曆的 pdf 跟 png 準備好
- 111 第一學期 → 放到 static/assets/111-1.pdf、static/assets/111-1.png
- git commit 到 assets; git push

## 更新幹部

- 到 ./data/幹部.yaml 新增資料
- 把頭貼放到 ./static/assets/avatar 裡
- 這樣就好了。`layouts/partials/幹部.html` 會自動取用最新一年的資料。
