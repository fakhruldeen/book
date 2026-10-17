---
layout: section
title: "الرسوم التوضيحية وشجرة الأصول"
slug: "04-images-and-figures"
permalink: /03_visuals/04_images_and_figures/
published: true
author: "محمد فخر الدين"
quiz:
  - type: mcq
    q: "أي وسم HTML دلالي يُفضل استخدامه لعرض الصور التوضيحية مع شروحها النصية المصاحبة؟"
    options: ["<figure> و <figcaption>", "<div> و <span>", "<table> و <td>"]
    answer: 1
    explain: "وسم figure مع figcaption يوفر الدلالة الدقيقة للصورة وشرحها التوضيحي المعتمد في الكتب."
  - type: radio
    q: "كل فصل وقسم يمتلك مجلدات خاصة به للأصول (صور، مستندات، وملفات متجهة SVG) في شجرة assets/chapters/."
    options: ["صحيح", "خطأ"]
    answer: 1
    explain: "صحيح! يضمن هذا الهيكل عدم اختلاط أصول الفصول مع بعضها وسهولة صيانتها ونقلها."
---

## تضمين الصور والأشكال الدلالية (`<figure>`)

يُفضل في الكتب الرقمية تنضيد الرسوم التوضيحية داخل وسم `<figure>` مع إضافة تعليق شارح دلالي بواسطة `<figcaption>`:

<figure style="margin: 2rem auto; text-align: center; max-width: 650px;">
  <img src="{{ '/assets/chapters/03_visuals/04_images_and_figures/svg/sample_figure.svg' | relative_url }}" alt="شجرة الأصول الرقمية المنظمة" style="width: 100%; height: auto; border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06);" />
  <figcaption style="margin-top: 0.8rem; font-size: 0.95rem; color: var(--muted); font-family: 'Noto Naskh Arabic', sans-serif;">
    <strong>شكل (٣ - ١):</strong> معمارية شجرة الأصول الرقمية المنظمة لكل فصل وقسم فرعي.
  </figcaption>
</figure>

---

## تضمين الرموز المتجهة (SVG) والصور الشخصية

تتميز الملفات المتجهة بصيغة **SVG** بأنها لا تفقد دقتها على الإطلاق عند التكبير أو القراءة على شاشات Retina فائقة الكثافة، كما أنها خفيفة الحجم وسريعة التحميل:

<div style="display: flex; align-items: center; gap: 1.5rem; background: var(--bg-alt); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border); margin: 2rem 0;">
  <img src="{{ '/assets/images/author.svg' | relative_url }}" alt="الصورة الرمزية للمؤلف" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--accent); box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
  <div>
    <h4 style="margin: 0 0 0.4rem 0; font-family: 'Cairo', sans-serif;">الصورة الرمزية للمؤلف (Vector SVG)</h4>
    <p style="margin: 0; font-size: 0.95rem; color: var(--muted); line-height: 1.6;">
      تُستدعى الصورة تلقائيًا من مسار <code>{{ site.author.avatar }}</code> المحدد في ملف <code>_config.yml</code> وتظهر في بطاقة سيرة الكاتب وصفحة فريق العمل.
    </p>
  </div>
</div>

---

## هيكل شجرة الأصول الرقمية المنظمة (Numbered Asset Tree)

لتنظيم ملفات الكتاب، يتبع القالب مجلدات مطابقة لأرقام ومسميات الفصول:

```text
assets/chapters/
├── 01_basics/
│   ├── 01_text/{docs, images, svg}
│   └── 02_lists/
│       └── 02_tables/{docs, images, svg}
├── 02_code/
│   ├── 01_blocks/{docs, images, svg}
│   └── 02_inline_and_terminals/{docs, images, svg}
├── 03_visuals/
│   ├── 01_mermaid/{docs, images, svg}
│   ├── 02_math/{docs, images, svg}
│   ├── 03_callouts/{docs, images, svg}
│   └── 04_images_and_figures/{docs, images, svg}
```
