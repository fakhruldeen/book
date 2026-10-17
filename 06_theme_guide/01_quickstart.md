---
layout: section
title: "البداية السريعة واستخدام القالب كـ GitHub Template"
slug: "01-quickstart"
permalink: /06_theme_guide/01_quickstart/
published: true
author: "محمد فخر الدين"
quiz:
  - type: radio
    q: "خيار 'Use this template' على GitHub ينشئ مستودعًا جديدًا نظيفًا يبدأ من تاريخ التزام (commit) واحد دون وراثة سجل التعديلات القديم للمستودع الأصلي."
    options: ["صحيح", "خطأ"]
    answer: 1
    explain: "صحيح! وهذه هي الميزة الأساسية لخاصية GitHub Templates مقارنة بالتفريع (Fork)."
  - type: check
    q: "ما المتطلبات البرمجية الواجب تثبيتها محليًا على حاسوبك حتى تتمكن من نشر كتابك عبر هذا القالب؟"
    options: ["لا يتطلب أي برامج إطلاقًا؛ يمكن الكتابة والنشر مباشرة من متصفح الويب عبر GitHub", "تثبيت محرك Jekyll و Ruby (اختياري فقط في حال أردت المعاينة المحلية)", "تثبيت خادم Apache محلي", "تثبيت قاعدة بيانات MySQL"]
    answer: [1, 2]
    explain: "القالب مبني ليعمل دون أي برامج محلية عبر واجهة GitHub، وتثبيت Jekyll وRuby محليًا أمر اختياري تمامًا للمطورين."
---

## كيف تبدأ كتابك الجديد في دقيقة واحدة؟

تم إعداد هذا المستودع كـ **قالب رسمي (GitHub Template Repository)**، مما يعني أنه يمكنك استخدامه لإنشاء مستودع خاص بكتابك بنقرة زر واحدة دون الحاجة لتفريعه (Forking) أو نقل تاريخ الالتزامات السابق.

### الطريقة الأولى: عبر واجهة موقع GitHub (دون كتابة أي سطر أوامر)

1. انتقل إلى مستودع القالب الأساسي: [github.com/fakhruldeen/book](https://github.com/fakhruldeen/book).
2. انقر على الزر الأخضر **Use this template** أعلى يمين الصفحة، ثم اختر **Create a new repository**.
3. حدد اسم المستودع الجديد (مثلاً: `my-awesome-book`).
4. اختر نوع المستودع: **Public** (لإتاحة النشر المجاني عبر GitHub Pages).
5. اضغط على **Create repository**.
6. انتقل مباشرة إلى تبويب **Settings** ← **Pages**:
   - تحت **Build and deployment**، اختر المصدر: `Deploy from a branch`.
   - حدد الفرع: `main` والمجلد: `/ (root)`.
   - انقر **Save**.
7. في غضون ثوانٍ قليلة، ستقوم منصة GitHub ببناء كتابك ونشره على رابط مباشر مثل:
   `https://<username>.github.io/<repository-name>/`.

---

### الطريقة الثانية: عبر سطر الأوامر (Git CLI) للمطورين

إذا كنت تفضل العمل على جهازك الشخصي باستخدام محرر الأكواد (مثل VS Code):

```bash
# استنساخ مستودع كتابك الجديد
git clone https://github.com/<your-username>/<your-book-repo>.git
cd <your-book-repo>

# تعديل ملف التكوين أو إضافة فصولك الجديدة
# ثم دفع التحديثات إلى فرع main
git add -A
git commit -m "docs: add my first chapter"
git push origin main
```

---

## المعاينة المحلية (Local Development) للمطورين (اختياري)

إذا كنت ترغب في تشغيل خادم محلي لمعاينة التعديلات أثناء الكتابة دون الاتصال بالإنترنت:

```bash
# تثبيت الحزم المعتمدة لـ GitHub Pages
bundle install

# تشغيل خادم Jekyll المحلي مع التحديث الفوري
bundle exec jekyll serve --livereload
```
ثم افتح متصفحك على: `http://localhost:4000/book/`.
