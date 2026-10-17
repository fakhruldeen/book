---
layout: backmatter
title: "بيانات النشر والترخيص والتنضيد (Colophon)"
slug: "colophon"
permalink: /backmatter/colophon/
published: true
author: "محمد فخر الدين"
date: 2026-10-18T00:00:00+03:00
copyright_holder: "محمد فخر الدين (Mohamed Fakhruldeen)"
copyright_year: 2026
copyright_statement: "جميع الحقوق محفوظة للمؤلف © 2026. المحتوى متاح بموجب رخصة المشاع الإبداعي والبرمجيات برخصة جنو العمومية الإصدار الثالث."
license_name: "GNU General Public License v3.0 (GPL-3.0)"
license_url: "https://www.gnu.org/licenses/gpl-3.0.html"
---

## حقوق النشر والترخيص القانوني

جميع النصوص البرمجية والقوالب وهيكل هذا الكتاب مرخصة بموجب **رخصة جنو العمومية (GNU General Public License v3.0)**. 
يحق لك استخدام هذا القالب، وتعديله، ونشر كتبك الرقمية المشتقة منه، مع الالتزام بشروط الترخيص المفتوح وعزو العمل لأصله.

المحتوى النصي والتعليمي متاح للاستفادة والتعلم والتوثيق، وجميع الحقوق الأدبية والفكرية محفوظة للمؤلف: **{{ page.copyright_holder }}**.

---

## مواصفات الكتاب والبيانات الببليوغرافية

| الحقل | البيان التوثيقي |
| :--- | :--- |
| **عنوان العمل** | {{ site.title }} |
| **العنوان الفرعي** | {{ site.subtitle }} |
| **اسم المؤلف** | {{ site.author.name }} ({{ site.author.latin_name }}) |
| **رقم الإيداع الدولي (ISBN)** | `{{ site.isbn }}` |
| **المعرف الرقمي (DOI)** | `{{ site.doi }}` |
| **رقم الإصدارة والطبعة** | {{ site.edition }} — الإصدار `v{{ site.version }}` |
| **تاريخ الاعتماد والنشر** | {{ site.book_date_formatted | default: site.book_timestamp }} |
| **البريد الإلكتروني للتواصل** | `{{ site.contact.email }}` |
| **الموقع الإلكتروني للمؤلف** | [{{ site.author.website }}]({{ site.author.website }}) |
| **المستودع المصدري** | [github.com/fakhruldeen/book]({{ site.downloads.source }}) |

---

## الخطوط والتنضيد الطباعي

- **الخط الأساسي للعناوين والمتون:** خط «القاهرة» (Cairo) وخط «النسخ» (Noto Naskh Arabic) من خطوط Google Fonts الحرة.
- **خط الشفرات البرمجية والأرقام:** خط «Fira Code» مع دعم Ligatures البرمجية المتقدمة.
- **المحرك والمولد الثابت:** مبني بواسطة محرك [Jekyll](https://jekyllrb.com/) ومستضاف على خوادم **GitHub Pages**.

---

## البصمة الرقمية والتحقق من السلامة

كل صفحة في هذا الكتاب تولد بصمة رقمية مشفرة بصيغة **SHA-256** لضمان سلامة المحتوى وعدم العبث به أثناء النقل. يمكنك التحقق من البصمة في شريط التوثيق أسفل كل صفحة.
