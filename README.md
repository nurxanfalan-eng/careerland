# Careerland Təhsil Mərkəzi

## Layihə haqqında
Careerland Təhsil Mərkəzinin rəsmi veb saytı. Tamamilə statik HTML/CSS/JS-dən ibarət olan bu sayt Render.com Static Site kimi deploy edilir.

## Canlı URL
**Render.com-da Deploy:** [Tezliklə əlavə ediləcək]
**GitHub:** https://github.com/nurxanfalan-eng/careerland

## Xüsusiyyətlər
- ✅ Hero/Banner bölməsi (animasiyalı sayğac, SVG illüstrasiya)
- ✅ Xəbərlər bölməsi (modal overlay ilə)
- ✅ Hazırlıqlar bölməsi (çoxsəviyyəli kart naviqasiyası)
- ✅ Müəllimlər bölməsi (ətraflı profil)
- ✅ Uğurlu Məzunlar bölməsi
- ✅ Qalerya (lightbox ilə)
- ✅ Əlaqə (WhatsApp, Instagram, Xəritə açılır)
- ✅ İmtahanlar (OTK.AZ-a yönləndirir)
- ✅ FAQ (accordion)
- ✅ Haqqımızda
- ✅ Tam mobil uyğun (responsive)
- ✅ Backend yoxdur – tam static

## Fayl strukturu
```
careerland/
├── index.html          # Əsas HTML faylı (bütün səhifələr)
├── css/
│   └── style.css       # Bütün stillər
├── js/
│   ├── data.js         # ← Məlumatları burada dəyişin!
│   └── app.js          # SPA məntiqi
├── images/
│   ├── logo.png        # Careerland loqosu
│   └── teacher-elmira.jpg
└── README.md
```

## Developer üçün – Məlumat əlavə etmək

### Müəllim əlavə etmək (`js/data.js`)
```js
const TEACHERS = [
  {
    id: "unique-id",
    name: "Müəllim adı",
    subject: "Fənn",
    photo: "images/photo.jpg",  // və ya null
    university: "Universitet adı",
    graduationYear: 2020,
    experience: "5 il",
    miqScore: 85.5,   // null olarsa göstərilmir
    miqYear: 2025,
    successfulStudents: 150,
    categories: ["abituriyent", "miq"],
    subCategories: ["informatika"],
    achievements: ["Nailiyyət 1", "Nailiyyət 2"],
    description: "Qısa məlumat",
    teachingAreas: ["Abituriyent", "MİQ hazırlığı"]
  }
];
```

### Xəbər əlavə etmək (`js/data.js`)
```js
const NEWS = [
  {
    id: "news-x",
    title: "Xəbər başlığı",
    date: "1 Yanvar 2025",
    shortText: "Qısa mətn",
    fullText: "Ətraflı mətn...",
    colorClass: "purple",  // purple / green / orange
    icon: "📢"
  }
];
```

### Şəkil əlavə etmək
1. Şəkli `images/` qovluğuna kopyalayın
2. `js/data.js`-də `GALLERY` massivini yeniləyin:
```js
const GALLERY = [
  { id: "gal-x", src: "images/yeni-shekil.jpg", alt: "Açıqlama" }
];
```

### Məzun əlavə etmək (`js/data.js`)
```js
const GRADUATES = [
  {
    id: "grad-x",
    name: "Ad Soyad",
    score: "Bal: 680",
    photo: "images/mezun.jpg"  // və ya null
  }
];
```

## Deploy (Render.com)
1. GitHub-a push edin
2. Render.com-da "New Static Site" yaradın
3. Repository: `nurxanfalan-eng/careerland` seçin
4. Build Command: boş buraxın
5. Publish Directory: `.` (kök qovluq)
6. "Deploy" düyməsini basın

## Əlaqə məlumatları (dəyişmək üçün index.html)
- WhatsApp: +994 55 940 60 18
- Instagram: @careerland
- Xəritə: https://maps.app.goo.gl/JRdnmuJs9ZrhbVMs5

## Texnologiyalar
- Pure HTML5 / CSS3 / Vanilla JavaScript
- Font Awesome 6.4.0 (CDN)
- Google Fonts – Inter
- Backend yoxdur
- Render.com Static Site uyğun
