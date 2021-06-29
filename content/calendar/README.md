# 行事曆頁面

我已經設定成`static/assets/calendar`資料夾下每一個pdf檔在輸出的時候都會在這個資料夾產生一個對應的檔案，方便Hugo製作列表。

`_index.md`設定的是列表頁面的標題，並且要求其他頁面也都要用`layouts/calendar/calendar.html`這個模板。這是因為我希望這裡的列表跟單頁用同一個模板。
