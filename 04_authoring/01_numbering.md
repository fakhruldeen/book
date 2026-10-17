---
layout: section
title: الترقيم والبنية الشجرية
slug: "01-numbering"
permalink: /04_authoring/01_numbering/
published: true
quiz:
  - type: mcq
    q: "ما هو القالب المخصص للنقاط التفصيلية بمستوى عنوان h6 وعمق 5 في القالب؟"
    options: ["subsubsubsection", "chapter", "frontmatter"]
    answer: 0
    explain: "قالب subsubsubsection مخصص للنقاط التفصيلية (h6 وعمق 5)."
  - type: mcq
    q: "كيف تظهر الروابط الدائمة (Permalinks) لصفحات وفصول هذا الكتاب؟"
    options: ["روابط نظيفة تنتهي بـ / بدون امتداد .html", "تنتهي دائمًا بـ .html", "تنتهي بـ .php"]
    answer: 0
    explain: "تم ضبط permalink: pretty لتعمل كافة المسارات بصيغة المجلدات النظيفة بدون .html."
  - type: check
    q: "ما هي المجلدات الثلاثة الفرعية الموجودة داخل بنية أصول كل فصل وقسم في assets/chapters/؟"
    options: ["images", "docs", "svg", "bin"]
    answer: [0, 1, 2]
    explain: "كل مجلد في assets/chapters/ مقسم إلى: images/ للصور، docs/ للمستندات والملفات، و svg/ للمتجهات."
---

## قواعد التسمية والهرمية الشجرية

اسم كل ملف يبدأ برقمين ثم شرطة سفلية ثم اسم لاتيني قصير، مع إمكانية تعيين القالب الصريح في ترويسة الـ Front Matter. **العنوان العربي** يُكتب داخل الملف في `title`.

### جدول المستويات الستة وقوالبها المقابلة

| المستوى الهيكلي | القالب المعياري | مسار الملف النموذجي | الرقم المرجعي | الوسم | الشارة |
|---|---|---|---|:---:|:---:|
| **فصل** | `layout: chapter` | `01_basics.md` | `01` | `h2` | فصل |
| **قسم** | `layout: section` | `01_basics/02_lists.md` | `01.02` | `h3` | قسم |
| **قسم فرعي** | `layout: subsection` | `01_basics/02_lists/01_lists.md` | `01.02.01` | `h4` | قسم فرعي |
| **بند فرعي** | `layout: subsubsection` | `01_basics/02_lists/02_tables/01_alignment.md` | `01.02.02.01` | `h5` | بند فرعي |
| **نقطة تفصيلية** | `layout: subsubsubsection` | `.../01_alignment/01_advanced_syntax.md` | `01.02.02.01.01` | `h6` | نقطة تفصيلية |
| **تفريعة دقيقة** | `layout: subsubsubsubsection` | `.../01_advanced_syntax/01_cell_formatting.md` | `01.02.02.01.01.01` | `h6` | تفريعة دقيقة |

---

### شجرة المجلدات المتدرجة

```text
01_basics.md                                        <- فصل 01
01_basics/
  01_text.md                                        <- قسم 01.01
  02_lists.md                                       <- قسم 01.02
  02_lists/
    01_lists.md                                     <- قسم فرعي 01.02.01
    02_tables.md                                    <- قسم فرعي 01.02.02
    02_tables/
      01_alignment.md                               <- بند فرعي 01.02.02.01
      01_alignment/
        01_advanced_syntax.md                       <- نقطة تفصيلية 01.02.02.01.01
        01_advanced_syntax/
          01_cell_formatting.md                     <- تفريعة دقيقة 01.02.02.01.01.01
```

---

### شريط مسار التصفح (Breadcrumbs) والفاصل `<`

يظهر مسار التصفح الهرمي أعلى كل صفحة تلقائيًا بالصيغة:

```text
الفهرس < 01 الأساسيات < 01.02 القوائم والجداول < 01.02.02 الجداول < 01.02.02.01 محاذاة الأعمدة
```

- **الفاصل `<`:** يظهر بلون النص الأساسي وبخط عريض يتوافق مع اتجاه القراءة العربية من اليمين لليسار.
- **ترقيم العناصر:** يسبق كل فصل أو قسم رقمه المرجعي المستنبط تلقائيًا.

---

### هيكل مجلدات الأصول المرقمة (Numbered Asset Tree)

يحتوي مجلد `assets/chapters/` على هيكل مرقم يطابق شجرة الفصول تمامًا، وكل مجلد يتفرع إلى ثلاثة مسارات مخصصة:

```text
assets/chapters/
├── 01_basics/
│   ├── images/   <- للصور الثابتة (PNG / JPEG / WebP)
│   ├── docs/     <- للمستندات والملفات المرفقة (PDF / ZIP)
│   └── svg/      <- للرسوم المتجهية والشعارات
└── ...
```

---

### ترويسة الملف المعيارية (Front Matter Standard)

لكل صفحة في الكتاب، يُنصح باستخدام الترويسة القياسية التالية:

```yaml
---
layout: section
title: "عنوان القسم أو الفصل"
slug: "section-slug"
permalink: /01_basics/01_text/
published: true
author: "محمد فخر الدين"
---
```

> [!NOTE]
> لاحظ أن الروابط لا تحتوي على `.html` نهائيًا بفضل تفعيل نمط `permalink: pretty` في تكوين الكتاب.
