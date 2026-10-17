# كتاب Markdown التفاعلي ومختبر الطباعة العربية (Jekyll Standard Book Theme)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-success?logo=github)](https://fakhruldeen.github.io/book)
[![Template Repository](https://img.shields.io/badge/GitHub-Template%20Repository-blue?logo=github)](https://github.com/fakhruldeen/book/generate)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3+-red?logo=jekyll)](https://jekyllrb.com/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![RTL Ready](https://img.shields.io/badge/Arabic-RTL%20Ready-emerald)]()

قالب كتاب عربي تفاعلي قياسي مبني وفق معايير **Jekyll Themes** الرسمية ومخصص ليكون **قالب مستودع جاهز (GitHub Template Repository)** للنشر المباشر عبر **GitHub Pages**، دون الحاجة لأي بناء محلي أو أدوات خارجية.

🌐 **الرابط المباشر على GitHub Pages:** [https://fakhruldeen.github.io/book](https://fakhruldeen.github.io/book)

---

## ⚡ البداية السريعة (ابدأ كتابك في دقيقة واحدة)

لإنشاء كتابك الجديد الخاص:

1. انقر على زر **[Use this template](https://github.com/fakhruldeen/book/generate)** أعلى يمين مستودع GitHub.
2. سمِّ مستودعك الجديد (مثلاً: `my-book`) واجعله **Public**.
3. من تبويب **Settings** ← **Pages** في مستودعك:
   - اختر المصدر: `Deploy from a branch`
   - حدد الفرع: `main` والمجلد: `/ (root)` ثم احفظ (**Save**).
4. عدّل بيانات كتابك واسمك في ملف `_config.yml`، وسيقوم GitHub بنشر موقع كتابك فورًا!

---

## 🌟 أبرز القدرات والميزات المعمارية

- 🎨 **هندسة قوالب معيارية (15 قالبًا في `_layouts/`):**
  - فصول رئيسية وأقسام متدرجة: `chapter`، `section`، `subsection`، `subsubsection`، `subsubsubsection`، `subsubsubsubsection`.
  - مواد افتتاحية وتصدير: `frontmatter` (المقدمة، التصدير، الإهداء) مع استدعاء تاريخ إصدار الكتاب.
  - خاتمة وبيانات طباعية: `backmatter` (بيانات النشر والترخيص، المراجع، ومعجم المصطلحات).
  - سجل المساهمين وتوثيق الحقوق: `contributors` لحفظ الحقوق الفكرية عبر 5 مراحل إنتاجية.
  - اختبارات تفاعلية شاملة: `mcq` كصفحة اختبار مستقلة أو مدمجة.
  - محرك بحث متقدم: `search` مع فهرسة حية فورية تدعم خصائص النص العربي.
  - الغلاف والفهرس: `cover` و `toc` و `default` و `page`.
- 📚 **فصل تدريبي متكامل للمستخدمين الجدد (Tutorial Chapter):**
  - فصل كامل (الفصل 06) يشرح بالتفصيل الممل كيفية استخدام وتخصيص القالب، والربط بـ `post_url`، وإدارة الأصول، واختبار كفاءة الاستخدام.
- 🔗 **روابط نظيفة دون امتداد (Pretty URLs):**
  - تفعيل `permalink: pretty` لتوليد مسارات نظيفة تنتهي بـ `/` لجميع فصول وصفحات الكتاب (مثل `/01_basics/` و `/contents/`).
- 🧭 **مسار تصفح هرمي دقيق (Breadcrumbs):**
  - فاصل `>` باللون الأساسي للنص وبخط عريض يلائم اتجاه القراءة العربي (RTL) مع ترقيم كل خطوة برقم المجلد أو الفصل الخاص بها.
- 📈 **شريط تقدم القراءة التراكمي:**
  - خط انسيابي متحرك أسفل الشريط العلوي يوضح نسبة إنجاز قراءة الصفحة لحظة بلحظة أثناء التمرير.
- 📑 **فهرس محتويات جانبي ذكي:**
  - قائمة جانبية ترصد العناوين الفرعية (`##` حتى `#####`)، قابلة للإخفاء والطي التلقائي على الشاشات الصغيرة.
- 🔒 **بصمة رقمية وتوثيق لحظي (SHA-256):**
  - شريط توثيق أسفل كل مقال يبيّن تاريخ وتوقيت النشر، اسم المؤلف، والبصمة الرقمية للمحتوى المشفرة مع إمكانية النسخ بنقرة واحدة.
- ⚖️ **مصفوفة المساهمين وحفظ الحقوق الفكرية:**
  - تغطية 5 مراحل إنتاجية (التأليف، المراجعة، التدقيق، التصميم والإنتاج، الإشراف والنشر) مع المعالجة اللغوية للمفرد والجمع (مثل: "محررو الأسلوب")، وشارات ORCID.
- 🎯 **نظام اختبارات تفاعلية غير مانع (5 أنواع أسئلة):**
  - اختيار من متعدد (`mcq`)، صح/خطأ (`radio`)، اختيارات متعددة (`check`)، إدخال رقمي (`number`)، ومقياس تقييم (`scale`).
- 📊 **مخططات بيانية ومعادلات رياضية:**
  - دعم أصلي لمخططات Mermaid (الانسيابية، التسلسل، جانت، الدائرية) ومعادلات LaTeX عبر MathJax.

---

## 🗂️ هيكل شجرة الكتاب والمستويات الستة

| المستوى الهيكلي | القالب المعياري | مسار الملف النموذجي | الترقيم المرجعي | الوسم | الشارة |
|---|---|---|:---:|:---:|:---:|
| **فصل** | `layout: chapter` | `01_basics.md` | `01` | `h2` | فصل |
| **قسم** | `layout: section` | `01_basics/02_lists.md` | `01.02` | `h3` | قسم |
| **قسم فرعي** | `layout: subsection` | `01_basics/02_lists/01_lists.md` | `01.02.01` | `h4` | قسم فرعي |
| **بند فرعي** | `layout: subsubsection` | `.../02_tables/01_alignment.md` | `01.02.02.01` | `h5` | بند فرعي |
| **نقطة تفصيلية** | `layout: subsubsubsection` | `.../01_advanced_syntax.md` | `01.02.02.01.01` | `h6` | نقطة تفصيلية |
| **تفريعة دقيقة** | `layout: subsubsubsubsection` | `.../01_cell_formatting.md` | `01.02.02.01.01.01` | `h6` | تفريعة دقيقة |

---

## 📖 فصول وأبواب الكتاب التوضيحية المدمجة

1. **مواد التصدير (Front Matter):**
   - `frontmatter/01_preface.md`: المقدمة وتصدير المؤلف وأهداف القالب.
   - `frontmatter/02_contributors.md`: سجل فريق العمل ومصفوفة صون الحقوق الفكرية.
   - `frontmatter/03_dedication.md`: الإهداء وكلمة الشكر والتقدير.
2. **فصول المتن الأساسي:**
   - `01_basics.md`: الأساسيات (تنسيق النصوص، القوائم، وتدرج الجداول حتى المستوى 6).
   - `02_code.md`: الشيفرة البرمجية (الكتل الملونة، الأسطر المرقمة، وأوامر الطرفية والرموز).
   - `03_visuals.md`: المخططات والرسوم (Mermaid، معادلات LaTeX، التنبيهات، وشجرة الأصول).
   - `04_authoring.md`: كيف تبني كتابك (الترقيم، صياغة الاختبارات، والبصمة الرقمية SHA-256).
   - `05_typography.md`: مختبر الطباعة العربية (التشكيل، النصوص ثنائية الاتجاه BiDi، الخطوط).
   - `06_theme_guide.md`: دليل استخدام القالب ونشر كتابك (الدليل الإرشادي التعليمي خطوة بخطوة).
   - `_book/07_collections.md`: التقنيات المتقدمة وتنظيم المجموعات (Jekyll Collections).
3. **الخاتمة والملحقات (Back Matter):**
   - `backmatter/01_colophon.md`: بيانات الطبع والمواصفات الببليوغرافية وتراخيص GPL-3.0.
   - `backmatter/02_references.md`: المراجع والمصادر الببليوغرافية المعتمدة (APA 7th).
   - `backmatter/03_glossary.md`: معجم المصطلحات والتعريفات التقنية والطباعية.

---

## 📁 هيكل مجلدات الأصول المرقمة (Numbered Asset Tree)

يحتوي مجلد `assets/chapters/` على مسارات منظمة مطابقة لشجرة الفصول والأقسام:

```text
assets/chapters/
├── 01_basics/
│   ├── 01_text/{images,docs,svg}
│   └── 02_lists/
│       └── 02_tables/
│           └── 01_alignment/
│               └── 01_advanced_syntax/
│                   └── 01_cell_formatting/{images,docs,svg}
├── 02_code/
│   ├── 01_blocks/{images,docs,svg}
│   └── 02_inline_and_terminals/{images,docs,svg}
├── 03_visuals/
│   ├── 01_mermaid/{images,docs,svg}
│   ├── 02_math/{images,docs,svg}
│   ├── 03_callouts/{images,docs,svg}
│   └── 04_images_and_figures/{images,docs,svg}
├── 04_authoring/...
├── 05_typography/...
├── 06_theme_guide/...
├── 07_collections/...
├── frontmatter/...
└── backmatter/...
```

---

## ⚙️ التكوين والإعدادات في `_config.yml`

يُدار الكتاب بالكامل عبر ملف `_config.yml` القياسي:
- **بيانات الكتاب:** العنوان، العنوان الفرعي، رقم الإيداع الدولي (`isbn`)، المعرف الرقمي (`doi`)، رقم الطبعة والإصدار.
- **تاريخ إصدار الكتاب:** `book_timestamp` و `book_date_formatted` يُستخدم في مواد التصدير والتذييل.
- **سيرة المؤلف:** الاسم، البريد، النبذة، الصورة الرمزية، الموقع، والدور.
- **مصفوفة المساهمين وحفظ الحقوق:** مصفوفة شاملة `contributors` تغطي 5 مراحل إنتاجية (التأليف، المراجعة، التدقيق، التصميم والإنتاج، الإشراف والنشر) مع المعالجة اللغوية للمفرد والجمع (مثل: "محررو الأسلوب")، وتدعم ربط معرفات `ORCID` والبيانات الوصفية المنظمة.
- **التراخيص والحقوق:** استخراج ديناميكي من الخاتمة `copyright.fetch_from: "frontmatter"` أو `"backmatter"`.
- **روابط التنزيل والتواصل:** ملفات `PDF` و `ePub` و `DOCX` وشبكات التواصل.
- **المجموعات:** تفعيل `collections: book: output: true`.

---

## 📝 الترويسة القياسية (Front Matter) والربط الداخلي

```yaml
---
layout: section
title: "عنوان القسم أو الفصل"
slug: "section-slug"
permalink: /01_basics/01_text/
published: true
author: "محمد فخر الدين"
quiz:
  - type: mcq
    q: "نص السؤال؟"
    options: ["الخيار الأول", "الخيار الثاني"]
    answer: 1
    explain: "شرح الإجابة"
---
```

### الربط الداخلي بالوسوم القياسية:
- بالتدوينات المؤرخة: `[رابط]({% raw %}{% post_url 2010-07-21-name-of-post %}{% endraw %})`
- بملفات وفصول الكتاب: `[الأساسيات]({% raw %}{% link 01_basics.md %}{% endraw %})`

---

## 🌐 English Overview

**Jekyll Arabic Interactive Book Theme** is a turnkey, standard Jekyll template designed specifically for writing, compiling, and publishing beautiful, responsive, and interactive Arabic digital books on **GitHub Pages** with zero setup.

### Key Features:
- 📖 **15 Modular Layouts:** Covers 6 levels of hierarchical content (`chapter` down to `subsubsubsubsection`), front matter, back matter, contributors matrix, cover, search, and quiz layouts.
- 🧭 **RTL & Arabic Web Typography:** Handcrafted Arabic typography, tashkeel handling, and BiDi isolation.
- 🎯 **Interactive Quizzes:** 5 question types (MCQ, True/False, Multiple Select, Numeric, Scale) running 100% clientside.
- 📈 **Dynamic Reading Progress Bar & In-Page TOC:** Smooth scrolling progress indicator and responsive sticky TOC drawer.
- ⚖️ **5-Stage Intellectual Rights Matrix:** Structured schema for authoring, reviewing, proofreading, design, and publishing contributors with ORCID integration and automatic Arabic pluralization.
- 🚀 **GitHub Template Ready:** Instant 1-click deployment via GitHub Pages without local Ruby/gem requirements.

---

## 📄 الترخيص

هذا القالب متاح بموجب رخصة [GNU General Public License v3.0](LICENSE).
جميع الحقوق الفكرية والأدبية للمحتوى محفوظة للمؤلف © 2026.
