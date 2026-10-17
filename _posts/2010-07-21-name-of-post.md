---
layout: section
title: "Welcome to my world!"
slug: "2010-07-21-name-of-post"
permalink: /sections/welcome-to-my-world/
published: true
author: "محمد فخر الدين"
date: 2010-07-21 12:00:00 +0300
---

## أهلاً بك في عالم الكتب التفاعلية

هذا القسم النموذجي يوضح كيفية استخدام Front Matter القياسي:
- `layout: section`
- `slug: "2010-07-21-name-of-post"`
- `permalink: /sections/welcome-to-my-world/`
- `published: true`

### الربط الداخلي بواسطة post_url

في محرك Jekyll، يمكنك استخدام وسام `post_url` للربط الداخلي المباشر بين التدوينات والأقسام المرقمة بالتاريخ:

```liquid
[رابط إلى هذا القسم]({% raw %}{% post_url 2010-07-21-name-of-post %}{% endraw %})
```

كما يمكنك استخدام وسام `link` للربط بملفات المجموعات والمجلدات الأخرى:

```liquid
[العودة للفصل الأول]({% raw %}{% link 01_basics.md %}{% endraw %})
```
