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
                       "\n"))
         (written-type type))
    (with-temp-file (format "content/posts/%s.md" date)
      (when (equal type "期初聚餐")
        (setq written-type "聚餐, 期初聚餐"))
      (when (equal type "期末聚餐")
        (setq written-type "聚餐, 期末聚餐"))
      (insert (format "---
title: %s.%s.%s %s
date: %s-%s-%s
tags: [社團活動, %s]
author: 如月
semester: %s
cover: %s
---

%s"
                      year month day type
                      year month day
                      written-type
                      semester
                      cover
                      photos-text)))))

(--each '("20200319")
  (k/create-post "期初聚餐" it "108-2"))
