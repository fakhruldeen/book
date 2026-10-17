---
title: كتل الشيفرة
quiz:
  - type: mcq
    q: "ما الذي يحدد لغة التلوين النحوي في كتلة الشيفرة في Markdown؟"
    options: ["اسم اللغة المكتوب مباشرة بعد علامات الثلاثة ```", "اسم الملف الحاوي", "نوع الخط المستخدم"]
    answer: 1
    explain: "تحديد معرف اللغة (مثل ```python أو ```javascript) يوجه ملوّن الصياغة Rouge لاختيار القواعد المناسبة."
  - type: check
    q: "أي من اللغات البرمجية الآتية تظهر أمثلتها في هذه الصفحة؟"
    options: ["JavaScript", "Python", "Rust", "SQL", "Bash"]
    answer: [1, 2, 3, 4, 5]
    explain: "تتضمن هذه الصفحة أمثلة عملية بخمس لغات برمجية مختلفة لاختبار التلوين النحوي."
  - type: radio
    q: "يوفر القالب زر نسخ (Copy) تفاعلياً أعلى كل كتلة برمجية ينسخ الكود بضغطة واحدة."
    options: ["صحيح", "خطأ"]
    answer: 1
    explain: "صحيح! يظهر زر 'نسخ' أعلى يمين كل كتلة كود وينسخ المحتوى إلى الحافظة تلقائيًا."
---

تُعرض الشيفرات البرمجية دائمًا بالاتجاه من اليسار إلى اليمين (`direction: ltr`) حتى داخل الصفحات العربية، مع خط ثابت العرض (Monospace) مريح للعين، وشارة للغة، وزر نسخ سريع.

---

### JavaScript / TypeScript

```javascript
// دالة ترحيبية تدعم النصوص العربية والإنجليزية
function greetReader(name, completedPages = 0) {
  const message = `أهلاً بك يا ${name}! لقد أنجزت ${completedPages} صفحة من الكتاب.`;
  console.log(message);
  return { status: "success", timestamp: new Date().toISOString() };
}

// تجربة الاستدعاء
greetReader("محمد", 5);
```

---

### Python

```python
from dataclasses import dataclass
from typing import List

@dataclass
class BookPage:
    ref_number: str
    title_ar: str
    quiz_questions: int

    def summary(self) -> str:
        # اختبار دمج النصوص العربية واللاتينية في Python
        return f"[{self.ref_number}] {self.title_ar} - {self.quiz_questions} أسئلة"

page = BookPage(ref_number="02.01", title_ar="كتل الشيفرة", quiz_questions=3)
print(page.summary())
```

---

### Rust

```rust
// نموذج مبسّط لحساب نسبة النجاح في الاختبار
pub struct QuizResult {
    pub total: u32,
    pub correct: u32,
}

impl QuizResult {
    pub fn percentage(&self) -> u32 {
        if self.total == 0 { return 100; }
        (self.correct * 100) / self.total
    }

    pub fn is_passed(&self, threshold: u32) -> bool {
        self.percentage() >= threshold
    }
}
```

---

### SQL (قواعد البيانات)

```sql
-- استعلام استخراج الصفحات الأكثر زيارة
SELECT 
    page_ref AS "الرقم_المرجعي",
    page_title AS "عنوان_الصفحة",
    COUNT(session_id) AS "عدد_القراء"
FROM book_analytics
WHERE completed = TRUE
GROUP BY page_ref, page_title
ORDER BY count(session_id) DESC
LIMIT 10;
```

---

### Bash / Shell

```bash
# استنساخ المستودع من GitHub وبدء العمل
git clone git@github.com:fakhruldeen/book.git
cd book

# تشغيل خادم الاختبار عند الحاجة
bundle install && bundle exec jekyll serve
```

---

### HTML و CSS

```html
<article class="content" dir="rtl">
  <header>
    <h2 class="title">عنوان المقال العربي</h2>
  </header>
  <p>هذا النص يوضح تناسق العناصر البصرية.</p>
</article>
```

```css
/* تنسيق العناصر البرمجية العربية */
.code-container {
  direction: ltr;
  text-align: left;
  font-family: "Fira Code", monospace;
  background-color: var(--code-bg);
  border-radius: 12px;
}
```

---

### تتبع الفروقات (Git Diff)

```diff
  # إعدادات ملف التهيئة _config.yml
- baseurl: ""
+ baseurl: "/book"
+ url: "https://fakhruldeen.github.io"
- author: "اسم المؤلف"
+ author: "Mohamed Fakhruldeen"
```
