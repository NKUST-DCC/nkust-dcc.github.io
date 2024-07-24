;; -*- mode: lisp-interaction; lexical-binding: t; -*-

(defun k/create-post (type date semester)
  "Create a new post for DATE.
TYPE is the type of the post.
DATE should be YYYYMMDD.
SEMESTER is which semester DATE belongs to."
  (let* ((year (string-to-number (substring date 0 4)))
         (roc-year (- year 1911))
         (month (substring date 4 6))
         (day (substring date 6 8))
         (photos
          (->> (f-files (f-join "static/assets/" date))
               (--map (f-relative it "static/"))))
         (cover (format "/%s" (car photos)))
         (photos-text (string-join
                       (--map
                        (format "{{< photo \"/%s\" >}}" it)
                        photos)
                       "\n")))
    (with-temp-file (format "content/posts/%s.md" date)
      (pcase type
        ("社集"
         (insert (format "---
title: %s.%s.%s 社集
date: %s-%s-%s
tags: [社團活動, 社集]
author: 如月
semester: %s
cover: %s
---

%s"
                         roc-year month day
                         year month day
                         semester
                         cover
                         photos-text)))
        ("社課"
         (insert (format "---
title: %s.%s.%s 社課
date: %s-%s-%s
tags: [社團活動, 社課]
author: 如月
semester: %s
cover: %s
---

%s"
                         roc-year month day
                         year month day
                         semester
                         cover
                         photos-text)))))))

(--each '("20221201")
  (k/create-post "社集" it "111-1"))
