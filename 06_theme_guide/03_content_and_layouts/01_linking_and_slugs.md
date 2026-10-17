---
layout: subsection
title: "الروابط الداخلية والربط بـ post_url والـ permalink"
slug: "01-linking-and-slugs"
permalink: /06_theme_guide/03_content_and_layouts/01_linking_and_slugs/
published: true
author: "محمد فخر الدين"
quiz:
  - type: mcq
    q: "أي وسم من وسوم Liquid يُستخدم للربط بالتدوينات أو المقالات المؤرخة داخل مجلد _posts؟"
    options: ["post_url", "link", "page_url", "include"]
    answer: 1
    explain: "وسم post_url في Jekyll يربط بالتدوينات المؤرخة بصيغة: {% post_url YYYY-MM-DD-title %}."
  - type: radio
    q: "تتيح ميزة الروابط النظيفة (permalink: pretty) في Jekyll الوصول للصفحات بمسار ينتهي بـ / دون الحاجة لكتابة .html في شريط العنوان."
    options: ["صحيح", "خطأ"]
    answer: 1
    explain: "صحيح! مثل: /01_basics/ و /06_theme_guide/01_quickstart/ بدلاً من الامتداد القديم."
---

## أساليب الربط الداخلي المعيارية في Jekyll

يوفر محرك Jekyll أدوات قوية للربط الداخلي بين أجزاء الكتاب لمنع الروابط المكسورة (Broken Links):

### 1. الربط بالتدوينات والمقالات المؤرخة (`post_url`)

عند الإشارة إلى مقال مؤرخ أو تدوينة داخل مجلد `_posts/`:

```markdown
يمكنك الاطلاع على التدوينة المرجعية من هنا:
[مقال توضيحي]({% raw %}{% post_url 2010-07-21-name-of-post %}{% endraw %})
```

- تجربة حية للربط: [مقال توضيحي بـ post_url]({% post_url 2010-07-21-name-of-post %}).

---

### 2. الربط بملفات وفصول الكتاب المباشرة (`link`)

للإشارة إلى ملف صفحة أخرى في الكتاب، يُفضل استخدام وسم `link` لضمان سلامة المسار حتى لو تغير الـ baseurl:

```markdown
- للعودة للأساسيات: [فصل الأساسيات]({% raw %}{% link 01_basics.md %}{% endraw %})
- لمقدمة الكتاب: [المقدمة والتصدير]({% raw %}{% link frontmatter/01_preface.md %}{% endraw %})
- لسجل المساهمين: [فريق العمل وسجل المساهمين]({% raw %}{% link frontmatter/02_contributors.md %}{% endraw %})
```

- تجربة حية: انتقل إلى [فصل الأساسيات]({% link 01_basics.md %}) أو [المقدمة والتصدير]({% link frontmatter/01_preface.md %}).

---

### 3. ضبط الـ Front Matter والمسار الدائم (`permalink`)

تتضمن ترويسة كل ملف الحقول المعيارية التالية:

```yaml
---
layout: subsection
title: "عنوان القسم أو الفصل"
slug: "01-linking-and-slugs"
permalink: /06_theme_guide/03_content_and_layouts/01_linking_and_slugs/
published: true
author: "اسم المؤلف"
date: 2026-10-18T00:00:00+03:00
---
```

- **`slug`:** اسم رمزي فريد للصفحة.
- **`permalink`:** المسار النظيف الذي يظهر في شريط عنوان المتصفح.
- **`published: true`:** تأكيد نشر الصفحة (أو `false` للمسودات غير الجاهزة).
