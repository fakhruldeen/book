---
layout: section
title: "النشر على GitHub Pages والدومين المخصص"
slug: "05-publishing-and-domains"
permalink: /06_theme_guide/05_publishing_and_domains/
published: true
author: "محمد فخر الدين"
quiz:
  - type: radio
    q: "عند ربط دومين مخصص (Custom Domain) مثل book.example.com، يجب تفريغ قيمة baseurl في _config.yml لتصبح baseurl: ''."
    options: ["صحيح", "خطأ"]
    answer: 1
    explain: "نعم، لأن الدومين المخصص يصبح هو النطاق الأساسي دون الحاجة لبادئة اسم المستودع."
  - type: mcq
    q: "ما اسم الملف الذي ينشئه GitHub في المستودع لحفظ اسم النطاق المخصص؟"
    options: ["CNAME", "DOMAIN.txt", "DNS.conf"]
    answer: 1
    explain: "يستخدم GitHub ملف CNAME في جذر المستودع لتوجيه النطاق المخصص."
---

## نشر الكتاب للعالم في خطوات بسيطة

بمجرد الانتهاء من كتابة وتنسيق محتواك، أصبح كتابك جاهزًا للنشر العالمي المجاني والسريع عبر شبكة خوادم GitHub CDN العالمية.

### خطوات التفعيل عبر إعدادات المستودع

1. افتح مستودع كتابك على GitHub.
2. ادخل إلى **Settings** ← **Pages**.
3. في قسم **Build and deployment**:
   - **Source:** اختر `Deploy from a branch`.
   - **Branch:** اختر `main`، والمجلد `/ (root)`.
   - اضغط **Save**.
4. سيبدأ إجراء **GitHub Actions** المدمج في العمل تلقائيًا، وخلال دقيقة واحدة ستتحول شارة الحالة إلى اللون الأخضر ويظهر رابط كتابك المباشر.

---

## ربط نطاق مخصص (Custom Domain)

إذا كنت ترغب في أن يظهر كتابك تحت دومين خاص بك (مثل `book.example.com` أو `mybook.org`):

### 1. إعداد سجلات DNS لدى مزود النطاق

- **لنطاق فرعي (Subdomain مثل `book.example.com`):**
  - أضف سجل `CNAME`:
    - الاسم (Name/Host): `book`
    - الهدف (Target/Value): `<username>.github.io`
- **لنطاق رئيسي (Apex Domain مثل `example.com`):**
  - أضف سجلات `A` تشير إلى عناوين خوادم GitHub Pages التالية:
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`

### 2. إعداد الدومين في GitHub

1. في صفحة **Settings** ← **Pages**، أدخل اسم النطاق في حقل **Custom domain**.
2. اضغط **Save** وسيتحقق GitHub من سجلات DNS تلقائيًا.
3. فعّل خيار **Enforce HTTPS** لتوليد شهادة أمان SSL/TLS مجانية ومحدثة تلقائيًا.

### 3. تعديل `_config.yml` للدومين المخصص

```yaml
# عند استخدام دومين مخصص:
baseurl: ""
url: "https://book.example.com"
```
ثم ادفع التغيير إلى فرع `main` لتحديث كافة الروابط في القالب فورًا.
