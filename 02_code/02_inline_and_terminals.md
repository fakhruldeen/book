---
layout: section
title: "الشيفرة المضمنة ومحاكاة الطرفية"
slug: "02-inline-and-terminals"
permalink: /02_code/02_inline_and_terminals/
published: true
author: "محمد فخر الدين"
quiz:
  - type: radio
    q: "يُستخدم الوسم <kbd> لتمثيل مدخلات لوحة المفاتيح واختصاراتها مثل Ctrl + C."
    options: ["صحيح", "خطأ"]
    answer: 1
    explain: "نعم، وسم <kbd> قياسي في HTML ويمنح أزرار الاختصارات تنسيقًا بصريًا مخصصًا يشبه مفاتيح لوحة المفاتيح الفعلية."
  - type: mcq
    q: "ما الرمز التقليدي الذي يميز طرفية المستخدم العادي في بيئات يونكس/لينكس؟"
    options: ["$", "#", "@"]
    answer: 1
    explain: "الرمز $ يمثل المستخدم العادي، بينما يمثل الرمز # المستخدم الجذري (root)."
---

## الشيفرة السطرية المضمنة (Inline Code)

عند ذكر متغيرات، أو دوال، أو مسارات ملفات داخل سياق الفقرات العربية، تُستخدم علامة الفاصلة المقلوبة `` ` ``.

- المسار الافتراضي لملف الإعدادات: `_config.yml`
- المتغير المسؤول عن العنوان: `site.title`
- دالة بدء الاختبار: `initQuizEngine(containerId)`
- مسار الأصول: `assets/chapters/02_code/`

تُعزل كافة العناصر السابقة تلقائيًا باستخدام خاصية `unicode-bidi: isolate`، مما يحفظ سلامة الأقواس والشُرط المائلة دون أي تشوه في الترتيب العربي المحيط بها.

---

## أزرار لوحة المفاتيح واختصاراتها (`<kbd>`)

لتوجيه القارئ إلى اختصارات لوحة المفاتيح في المتصفح أو بيئة التطوير:

- لحفظ التعديلات: <kbd>Ctrl</kbd> + <kbd>S</kbd> (أو <kbd>Cmd</kbd> + <kbd>S</kbd> على نظام macOS).
- لفتح أدوات المطورين: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>.
- لنسخ النص المظلل: <kbd>Ctrl</kbd> + <kbd>C</kbd> وللصقه: <kbd>Ctrl</kbd> + <kbd>V</kbd>.
- لإلغاء الأمر الجاري في الطرفية: <kbd>Ctrl</kbd> + <kbd>C</kbd>.

---

## محاكاة أوامر الطرفية ومخرجات الشاشة (Terminal Simulation)

تتطلب الكتب التقنية عرض أوامر سطر الأوامر (CLI) بوضوح مع عزل الرموز الموجهة:

```bash
# استنساخ المستودع المصدري للكتاب
$ git clone https://github.com/fakhruldeen/book.git

# الانتقال إلى مجلد المشروع
$ cd book

# التحقق من حالة الفروع والتعديلات
$ git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean

# دفع التحديثات إلى GitHub Pages
$ git push origin main
Everything up-to-date
```

---

## مخرجات عينات النظام (`<samp>`) والمتغيرات (`<var>`)

- عند محاكاة رسالة استجابة النظام: <samp>HTTP/1.1 200 OK - Content-Type: text/html; charset=utf-8</samp>.
- عند تمثيل صيغة رياضية برمجية بالمتغيرات: حاصل قسمة <var>x</var> على <var>y</var> ينتج <var>z</var>.
