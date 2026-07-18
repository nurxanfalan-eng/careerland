/**
 * ============================================================
 * CAREERLAND TƏHSİL MƏRKƏZİ - Data Configuration
 * ============================================================
 * Developer note:
 *   Edit this file to add/remove/modify:
 *   - Teachers (TEACHERS array)
 *   - Preparation categories (PREP_CATEGORIES array)
 *   - News (NEWS array)
 *   - Graduates (GRADUATES array)
 *   - Gallery images (GALLERY array)
 *   - FAQ items (FAQ array)
 * ============================================================
 */

/* ===================== TEACHERS =====================
   Each teacher object:
   {
     id: unique string,
     name: "Full Name",
     subject: "Subject name (Azerbaijani)",
     photo: "images/filename.jpg" or null for placeholder,
     university: "University name",
     graduationYear: 2020,
     experience: "X il",
     miqScore: 85.5,          // null if not applicable
     miqYear: 2025,           // null if not applicable
     successfulStudents: 120,
     categories: ["abituriyent", "miq"],  // which prep categories
     subCategories: ["informatika", "riyaziyyat"],  // which sub-subjects
     achievements: ["Region birincisi - 2025", "..."],
     description: "Short description",
     teachingAreas: ["Abituriyent (9-10-11-ci siniflər)", "Sertifikasiya və MİQ hazırlığı"],
   }
*/
const TEACHERS = [
  {
    id: "elmira-xelilova",
    name: "Elmira Xəlilova",
    subject: "İnformatika",
    photo: "images/teacher-elmira.jpg",
    university: "Azərbaycan Dövlət Pedaqoji Universiteti",
    graduationYear: 2020,
    experience: "5 il",
    miqScore: 85.5,
    miqYear: 2025,
    successfulStudents: 150,
    categories: ["abituriyent", "miq", "kurikulum"],
    subCategories: ["informatika"],
    achievements: [
      "Region birincisi - 2025 (MİQ 85.5 bal)",
      "150+ uğurlu məzun",
      "Azərbaycan olimpiada üzrə müəllim"
    ],
    description: "İnformatika sahəsinin region birincisi Elmira xanım, yüksək nəticəli hazırlıq proqramları ilə tələbələri uğura aparır.",
    teachingAreas: [
      "Abituriyent (9-10-11-ci siniflər)",
      "Sertifikasiya və MİQ hazırlığı",
      "Magistr",
      "Dövlət qulluğu"
    ]
  },
  {
    id: "muellim-2",
    name: "Aytən Məmmədova",
    subject: "Azərbaycan dili",
    photo: null,
    university: "Bakı Dövlət Universiteti",
    graduationYear: 2018,
    experience: "7 il",
    miqScore: 88.0,
    miqYear: 2024,
    successfulStudents: 200,
    categories: ["abituriyent", "miq", "ibtidai"],
    subCategories: ["az-dili"],
    achievements: [
      "MİQ 88 bal - 2024",
      "200+ uğurlu məzun",
      "Ən yaxşı müəllim mükafatı - 2023"
    ],
    description: "Azərbaycan dili sahəsinin peşəkar müəllimi. Dil qaydaları və ədəbiyyatda dərin biliyə sahibdir.",
    teachingAreas: [
      "Abituriyent hazırlığı",
      "İbtidai sinif hazırlığı",
      "MİQ hazırlığı",
      "Kurikulum hazırlığı"
    ]
  },
  {
    id: "muellim-3",
    name: "Rauf Hüseynov",
    subject: "Riyaziyyat",
    photo: null,
    university: "Sumqayıt Dövlət Universiteti",
    graduationYear: 2017,
    experience: "8 il",
    miqScore: 91.0,
    miqYear: 2024,
    successfulStudents: 180,
    categories: ["abituriyent", "miq"],
    subCategories: ["riyaziyyat"],
    achievements: [
      "MİQ 91 bal - 2024",
      "180+ uğurlu məzun",
      "Olimpiada üzrə baş mükafat - 2022"
    ],
    description: "Riyaziyyatda dərin analitik düşüncəni inkişaf etdirən peşəkar müəllim.",
    teachingAreas: [
      "Abituriyent hazırlığı",
      "MİQ hazırlığı",
      "Sertifikasiya"
    ]
  },
  {
    id: "muellim-4",
    name: "Leyla Əliyeva",
    subject: "İngilis dili",
    photo: null,
    university: "Xəzər Universiteti",
    graduationYear: 2019,
    experience: "6 il",
    miqScore: 87.5,
    miqYear: 2023,
    successfulStudents: 165,
    categories: ["abituriyent", "miq", "ibtidai", "alman"],
    subCategories: ["ing-dili"],
    achievements: [
      "IELTS 7.5 bal",
      "MİQ 87.5 bal - 2023",
      "165+ uğurlu məzun"
    ],
    description: "İngilis dili sahəsinin yüksək ixtisaslı müəllimi. IELTS, TOEFL hazırlığında da geniş təcrübəyə malikdir.",
    teachingAreas: [
      "Abituriyent hazırlığı",
      "İbtidai sinif - İngilis dili",
      "MİQ hazırlığı",
      "IELTS/TOEFL hazırlığı"
    ]
  },
  {
    id: "muellim-5",
    name: "Kamran Quliyev",
    subject: "Kimya",
    photo: null,
    university: "Azərbaycan Tibb Universiteti",
    graduationYear: 2016,
    experience: "9 il",
    miqScore: 89.0,
    miqYear: 2022,
    successfulStudents: 210,
    categories: ["abituriyent"],
    subCategories: ["kimya"],
    achievements: [
      "MİQ 89 bal - 2022",
      "210+ uğurlu məzun",
      "Kimya olimpiadası - 2020 mükafat"
    ],
    description: "Kimya fənninin peşəkar müəllimi. ATU hazırlığında yüksək nəticələr göstərir.",
    teachingAreas: [
      "Abituriyent hazırlığı - Kimya",
      "Blok hazırlığı",
      "Olimpiada hazırlığı"
    ]
  },
  {
    id: "muellim-6",
    name: "Nigar Rəsulova",
    subject: "Biologiya",
    photo: null,
    university: "Bakı Dövlət Universiteti",
    graduationYear: 2015,
    experience: "10 il",
    miqScore: 86.0,
    miqYear: 2021,
    successfulStudents: 190,
    categories: ["abituriyent"],
    subCategories: ["biologiya"],
    achievements: [
      "MİQ 86 bal - 2021",
      "190+ uğurlu məzun",
      "Biologiya olimpiadası finalist"
    ],
    description: "10 illik təcrübəsi olan biologiya müəllimi. ATU, ADPU hazırlığında yüksək nəticələr.",
    teachingAreas: [
      "Abituriyent hazırlığı - Biologiya",
      "Tibb fakültəsi hazırlığı"
    ]
  },
  {
    id: "muellim-7",
    name: "Elnur Babayev",
    subject: "Fizika",
    photo: null,
    university: "Azərbaycan Texniki Universiteti",
    graduationYear: 2014,
    experience: "11 il",
    miqScore: 90.0,
    miqYear: 2023,
    successfulStudents: 175,
    categories: ["abituriyent"],
    subCategories: ["fizika"],
    achievements: [
      "MİQ 90 bal - 2023",
      "175+ uğurlu məzun",
      "Fizika olimpiadası şampion - 2019"
    ],
    description: "Fizika sahəsinin tanınmış müəllimi. Mühəndislik fakültəsi hazırlığında mütəxəssisdir.",
    teachingAreas: [
      "Abituriyent hazırlığı - Fizika",
      "Mühəndislik hazırlığı",
      "Olimpiada hazırlığı"
    ]
  },
  {
    id: "muellim-8",
    name: "Sevinc Vəliyeva",
    subject: "Tarix",
    photo: null,
    university: "Azərbaycan Dövlət Pedaqoji Universiteti",
    graduationYear: 2018,
    experience: "7 il",
    miqScore: 84.0,
    miqYear: 2024,
    successfulStudents: 140,
    categories: ["abituriyent", "miq"],
    subCategories: ["tarix"],
    achievements: [
      "MİQ 84 bal - 2024",
      "140+ uğurlu məzun"
    ],
    description: "Tarix fənninin peşəkar müəllimi. Hümanitar fakültə hazırlığında böyük nəticələr.",
    teachingAreas: [
      "Abituriyent hazırlığı - Tarix",
      "MİQ hazırlığı",
      "Kurikulum hazırlığı"
    ]
  },
  {
    id: "muellim-9",
    name: "Fərəh Nağıyeva",
    subject: "Coğrafiya",
    photo: null,
    university: "Bakı Dövlət Universiteti",
    graduationYear: 2019,
    experience: "6 il",
    miqScore: 83.0,
    miqYear: 2023,
    successfulStudents: 130,
    categories: ["abituriyent"],
    subCategories: ["cografiya"],
    achievements: [
      "MİQ 83 bal - 2023",
      "130+ uğurlu məzun"
    ],
    description: "Coğrafiya fənninin müəllimi. Ekologiya və ətraf mühit hazırlığında mütəxəssisdir.",
    teachingAreas: [
      "Abituriyent hazırlığı - Coğrafiya",
      "Ekologiya hazırlığı"
    ]
  },
  {
    id: "muellim-10",
    name: "Tural İsmayılov",
    subject: "Ədəbiyyat",
    photo: null,
    university: "Bakı Dövlət Universiteti",
    graduationYear: 2017,
    experience: "8 il",
    miqScore: 85.0,
    miqYear: 2022,
    successfulStudents: 160,
    categories: ["abituriyent", "miq"],
    subCategories: ["edebiyyat"],
    achievements: [
      "MİQ 85 bal - 2022",
      "160+ uğurlu məzun"
    ],
    description: "Azərbaycan ədəbiyyatının dərin bilicisi. Buraxılış imtahanlarında yüksək nəticələr.",
    teachingAreas: [
      "Abituriyent hazırlığı - Ədəbiyyat",
      "MİQ hazırlığı"
    ]
  },
  {
    id: "muellim-11",
    name: "Anar Məmmədov",
    subject: "Mühasibatlıq",
    photo: null,
    university: "Azərbaycan Dövlət İqtisad Universiteti",
    graduationYear: 2016,
    experience: "9 il",
    miqScore: null,
    miqYear: null,
    successfulStudents: 120,
    categories: ["muhasibatliq"],
    subCategories: ["muhasibatliq"],
    achievements: [
      "ACCA sertifikatı",
      "120+ uğurlu kursiyent"
    ],
    description: "ACCA sertifikatlı mühasib. Mühasibatlıq kurslarında dərin praktiki təcrübəsi var.",
    teachingAreas: [
      "Mühasibatlıq əsasları",
      "Maliyyə hesabatları",
      "Vergi uçotu",
      "1C proqramı"
    ]
  },
  {
    id: "muellim-12",
    name: "Günel Həsənova",
    subject: "Rus dili",
    photo: null,
    university: "Bakı Slavyan Universiteti",
    graduationYear: 2015,
    experience: "10 il",
    miqScore: 87.0,
    miqYear: 2020,
    successfulStudents: 145,
    categories: ["rus-dili", "ibtidai"],
    subCategories: ["rus-dili"],
    achievements: [
      "MİQ 87 bal - 2020",
      "145+ uğurlu məzun",
      "Rus dili olimpiada müəllimi"
    ],
    description: "Rus dili sahəsinin yüksək ixtisaslı müəllimi. İbtidai sinif hazırlığında da geniş təcrübəsi var.",
    teachingAreas: [
      "Rus dili - bütün səviyyələr",
      "İbtidai sinif - Rus dili",
      "MİQ hazırlığı"
    ]
  }
];

/* ===================== PREP CATEGORIES ===================== */
const PREP_CATEGORIES = [
  {
    id: "abituriyent",
    name: "Abituryent hazırlığı",
    description: "Buraxılış imtahanları üçün kompleks hazırlıq",
    icon: "🎓",
    color: "#7c3aed",
    bgColor: "rgba(124,58,237,0.1)",
    subCategories: [
      {
        id: "az-dili",
        name: "Azərbaycan dili",
        icon: "📖",
        teacherIds: ["muellim-2"]
      },
      {
        id: "ing-dili",
        name: "İngilis dili",
        icon: "🌍",
        teacherIds: ["muellim-4"]
      },
      {
        id: "riyaziyyat",
        name: "Riyaziyyat",
        icon: "🔢",
        teacherIds: ["muellim-3"]
      },
      {
        id: "kimya",
        name: "Kimya",
        icon: "⚗️",
        teacherIds: ["muellim-5"]
      },
      {
        id: "biologiya",
        name: "Biologiya",
        icon: "🧬",
        teacherIds: ["muellim-6"]
      },
      {
        id: "fizika",
        name: "Fizika",
        icon: "⚡",
        teacherIds: ["muellim-7"]
      },
      {
        id: "informatika",
        name: "İnformatika",
        icon: "💻",
        teacherIds: ["elmira-xelilova"]
      },
      {
        id: "tarix",
        name: "Tarix",
        icon: "📜",
        teacherIds: ["muellim-8"]
      },
      {
        id: "cografiya",
        name: "Coğrafiya",
        icon: "🌍",
        teacherIds: ["muellim-9"]
      },
      {
        id: "edebiyyat",
        name: "Ədəbiyyat",
        icon: "📝",
        teacherIds: ["muellim-10"]
      }
    ]
  },
  {
    id: "ibtidai",
    name: "İbtidai sinif hazırlığı",
    description: "1-4 sinif şagirdləri üçün hazırlıq",
    icon: "🌱",
    color: "#16a34a",
    bgColor: "rgba(22,163,74,0.1)",
    subCategories: [
      {
        id: "az-dili-ibt",
        name: "Azərbaycan dili",
        icon: "📖",
        teacherIds: ["muellim-2"]
      },
      {
        id: "ing-dili-ibt",
        name: "İngilis dili",
        icon: "🌍",
        teacherIds: ["muellim-4"]
      },
      {
        id: "riyaziyyat-ibt",
        name: "Riyaziyyat",
        icon: "🔢",
        teacherIds: ["muellim-3"]
      },
      {
        id: "mentiq",
        name: "Məntiq",
        icon: "🧩",
        teacherIds: []
      }
    ]
  },
  {
    id: "kurikulum",
    name: "Kurikulum hazırlığı",
    description: "Müəllim Kurikulum imtahanına hazırlıq",
    icon: "📋",
    color: "#ea580c",
    bgColor: "rgba(234,88,12,0.1)",
    subCategories: [
      {
        id: "kurikulum-genel",
        name: "Kurikulum",
        icon: "📋",
        teacherIds: ["elmira-xelilova", "muellim-2"]
      }
    ]
  },
  {
    id: "alman",
    name: "Alman dili hazırlığı",
    description: "Alman dilini sıfırdan öyrən",
    icon: "🇩🇪",
    color: "#1d4ed8",
    bgColor: "rgba(29,78,216,0.1)",
    subCategories: [
      {
        id: "alman-dili",
        name: "Alman dili",
        icon: "🇩🇪",
        teacherIds: []
      }
    ]
  },
  {
    id: "muhasibatliq",
    name: "Mühasibatlıq hazırlığı",
    description: "Professional mühasibatlıq kursları",
    icon: "💼",
    color: "#0891b2",
    bgColor: "rgba(8,145,178,0.1)",
    subCategories: [
      {
        id: "muhasibatliq-genel",
        name: "Mühasibatlıq",
        icon: "💼",
        teacherIds: ["muellim-11"]
      }
    ]
  },
  {
    id: "rus-dili",
    name: "Rus dili müəllimi",
    description: "Rus dili öyrən – peşəkar müəllimlə",
    icon: "🇷🇺",
    color: "#b91c1c",
    bgColor: "rgba(185,28,28,0.1)",
    subCategories: [
      {
        id: "rus-dili-genel",
        name: "Rus dili",
        icon: "🇷🇺",
        teacherIds: ["muellim-12"]
      }
    ]
  },
  {
    id: "miq",
    name: "MİQ hazırlığı",
    description: "Müəllim İnkişafı Qiyməntləndirməsi hazırlığı",
    icon: "🏆",
    color: "#f5c518",
    bgColor: "rgba(245,197,24,0.1)",
    subCategories: [
      {
        id: "miq-genel",
        name: "MİQ Ümumi",
        icon: "🏆",
        teacherIds: ["elmira-xelilova", "muellim-2", "muellim-3", "muellim-4"]
      }
    ]
  }
];

/* ===================== NEWS ===================== */
const NEWS = [
  {
    id: "news-1",
    title: "Yeni MİQ qrupu başlayır!",
    date: "15 Avqust 2024",
    shortText: "Yeni MİQ qrupumuza qeydiyyat başladı!",
    fullText: "Hörmətli müəllim dostlarımız! Sentyabr ayından yeni MİQ hazırlıq qrupumuz başlayır. Peşəkar müəllimlərimizlə birlikdə MİQ imtahanına hazırlaşmaq üçün indi qeydiyyatdan keçin. Məhdud sayda yer var – tez davranın! Ətraflı məlumat üçün +994 55 940 60 18 nömrəsinə zəng edin.",
    colorClass: "purple",
    icon: "📢"
  },
  {
    id: "news-2",
    title: "650+ bal toplayan tələbələrimiz",
    date: "10 Avqust 2024",
    shortText: "2024 qəbul nəticələrimiz qürurvericidir!",
    fullText: "2024-cü il qəbul imtahanlarında tələbələrimiz möhtəşəm nəticələr göstərdi! 650+ bal toplayan 25-dən çox tələbəmiz arzuladığı universitetlərə qəbul oldu. Bu uğur bizim üçün böyük qürur mənbəyidir. Bütün uğurlu məzunlarımızı təbrik edirik! Siz də gələcək ilə uğurlu nəticə üçün bizimlə olun.",
    colorClass: "green",
    icon: "🏆"
  },
  {
    id: "news-3",
    title: "Yay endirimi 20%",
    date: "5 Avqust 2024",
    shortText: "Bütün hazırlıqlar üzrə yay endirimi başladı!",
    fullText: "Yay mövsümü münasibəti ilə bütün kurslarımızda 20% endirim elan edirik! Bu fürsəti əldən verməyin. Abituriyent, MİQ, Kurikulum, dil kursları – hamısında bu endirim tətbiq olunur. Endirim müddəti məhdudlaşdırılıb. İndi qeydiyyatdan keçin və 20% qənaət edin!",
    colorClass: "orange",
    icon: "🎉"
  },
  {
    id: "news-4",
    title: "Yeni qehi qrupu başlayır!",
    date: "15 Avqust 2024",
    shortText: "Yeni MİQ qrupumuza qeydiyyat başladı!",
    fullText: "Hörmətli müəllim dostlarımız! Sentyabr ayından yeni MİQ hazırlıq qrupumuz başlayır. Peşəkar müəllimlərimizlə birlikdə MİQ imtahanına hazırlaşmaq üçün indi qeydiyyatdan keçin. Məhdud sayda yer var – tez davranın! Ətraflı məlumat üçün +994 55 940 60 18 nömrəsinə zəng edin.",
    colorClass: "purple",
    icon: "📢"
  },
];

/* ===================== GRADUATES ===================== */
const GRADUATES = [
  {
    id: "grad-1",
    name: "Elmira Xəlilova",
    score: "MİQ: 85.5",
    photo: "images/teacher-elmira.jpg"
  },
  {
    id: "grad-2",
    name: "Aynur Əliyeva",
    score: "Bal: 680",
    photo: null
  },
  {
    id: "grad-3",
    name: "Murad Hüseynov",
    score: "Bal: 660",
    photo: null
  },
  {
    id: "grad-4",
    name: "Zəhra Quliyeva",
    score: "Bal: 655",
    photo: null
  },
  {
    id: "grad-5",
    name: "Rəşad İsmayılov",
    score: "MİQ: 88",
    photo: null
  },
  {
    id: "grad-6",
    name: "Lalə Məmmədova",
    score: "Bal: 640",
    photo: null
  }
];

/* ===================== GALLERY ===================== */
const GALLERY = [
  {
    id: "gal-1",
    src: "images/logo.png",
    alt: "Careerland Logosu"
  },
  {
    id: "gal-2",
    src: "images/teacher-elmira.jpg",
    alt: "Müəllim - Elmira Xəlilova"
  }
  // Add more gallery images here:
  // { id: "gal-3", src: "images/gallery3.jpg", alt: "Sinif şəkli" }
];

/* ===================== FAQ ===================== */
const FAQ = [
  {
    question: "Qeydiyyatdan necə keçə bilərəm?",
    answer: "Qeydiyyat üçün bizimlə WhatsApp (+994 55 940 60 18) və ya Instagram (@careerland) vasitəsilə əlaqə saxlayın. Uyğun vaxt müəyyənləşdirilib sınaq dərsinə dəvət olunacaqsınız."
  },
  {
    question: "Dərslər nə vaxt başlayır?",
    answer: "Qruplar hər ay tamamlanır. Cari qrupların başlama tarixi haqqında ətraflı məlumat üçün bizimlə əlaqə saxlayın."
  },
  {
    question: "Onlayn dərslər mövcuddurmu?",
    answer: "Bəli, həm üz-üzə, həm də onlayn formatda dərslər mövcuddur. Sizdən asılı olaraq uyğun formatı seçə bilərsiniz."
  },
  {
    question: "MİQ hazırlığı neçə müddət çəkir?",
    answer: "MİQ hazırlığı adətən 3-4 ay davam edir. Lakin tələbənin hazırlıq səviyyəsinə uyğun fərdi proqramlar da mövcuddur."
  },
  {
    question: "Qiymətlər haqqında məlumat verə bilərsinizmi?",
    answer: "Qiymətlər kurs növündən, müddətindən və formatından asılı olaraq dəyişir. Konkret qiymət məlumatı üçün WhatsApp-dan (+994 55 940 60 18) bizimlə əlaqə saxlayın."
  },
  {
    question: "Müəllimlərin peşəkarlıq səviyyəsi nə qədərdir?",
    answer: "Bütün müəllimlərimiz öz sahəsinin mütəxəssisləridir, yüksək MİQ balları vardır və böyük iş təcrübəsinə malikdirlər. Hər müəllimin profili saytımızda mövcuddur."
  },
  {
    question: "Uşağımın nəticəsi olmasa geri ödəmə varmı?",
    answer: "İlk 2 dərsdən sonra razı qalmasanız pulunuzu geri ala bilərsiniz. Bizim məqsədimiz hər tələbənin uğurudur."
  },
  {
    question: "Mərkəziniz haradadır?",
    answer: "Mərkəzimizin ünvanını xəritə bölməsindən tapa bilərsiniz. Həmçinin onlayn dərslər üçün heç bir məkan tələb olunmur."
  }
];
