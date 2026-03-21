# 🛡️ Anduril Contracts Tracking System

מערכת מעקב וניתוח חוזים עבור אנדוריל תעשיות - דשבורד אינטראקטיבי עם ויזואליזציות מתקדמות וניתוח פיננסי.

## 🌟 תכונות עיקריות

### 📊 דשבורד מרכזי
- **סיכום סטטיסטי**: מספר חוזים כולל, שווי כולל, ממוצעים וגורמים ממשלתיים
- **גרפים אינטראקטיביים**: ויזואליזציה של חוזים לפי שנים, גורמים ממשלתיים ועוד
- **טבלאות מפורטות**: סיכום נתונים עם אפשרות למיון וסינון

### 💼 רשימת חוזים
- **תצוגה מפורטת**: כל החוזים עם מידע מלא
- **מיון מתקדם**: לפי סכום, תאריך, גורם ממשלתי
- **ניווט בין עמודים**: תמיכה ב-pagination

### 📈 ניתוח פיננסי
- **שיעור צמיחה**: חישוב צמיחה כוללת ושנתית
- **זיהוי טרנדים**: ניתוח מגמות אוטומטי
- **תחזיות**: חיזוי שווי חוזים לשנה הבאה
- **גרפים מתקדמים**: Year-over-Year growth, שווי מצטבר, ממוצעים

### 🔍 חיפוש מתקדם
- **פילטרים מרובים**: מילות חיפוש, טווח תאריכים, סכומים
- **תוצאות מיידיות**: חיפוש מהיר ואפקטיבי
- **ייצוא נתונים**: הורדת תוצאות ל-CSV

### 🌐 אינטגרציה עם מקורות נתונים
- **USASpending.gov API**: שליפה אוטומטית של חוזים ממשלתיים אמריקאיים
- **מוכן להרחבה**: תמיכה עתידית ב-APIs נוספים של מדינות אחרות

## 🚀 התקנה והרצה

### דרישות מקדימות

- Node.js 16+ ו-npm/yarn
- דפדפן מודרני (Chrome, Firefox, Safari, Edge)

### שלב 1: התקנת Backend

```bash
cd backend
npm install
```

צור קובץ `.env` (אופציונלי):
```bash
cp .env.example .env
```

הרץ את השרת:
```bash
npm start
```

השרת ירוץ על `http://localhost:5000`

### שלב 2: התקנת Frontend

```bash
cd frontend
npm install
```

הרץ את האפליקציה:
```bash
npm start
```

האפליקציה תיפתח אוטומטית בדפדפן על `http://localhost:3000`

## 📁 מבנה הפרויקט

```
Anduril-Project/
├── backend/
│   ├── server.js           # שרת Express עם API endpoints
│   ├── package.json        # תלויות Backend
│   ├── .env.example        # דוגמת קובץ הגדרות
│   └── data/              # תיקיית נתונים (cache)
│
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML ראשי
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js      # דשבורד מרכזי
│   │   │   ├── ContractsList.js  # רשימת חוזים
│   │   │   ├── Analytics.js      # ניתוח פיננסי
│   │   │   └── Search.js         # חיפוש מתקדם
│   │   ├── App.js         # קומפוננטה ראשית
│   │   ├── App.css        # סגנון כללי
│   │   └── index.js       # נקודת כניסה
│   └── package.json       # תלויות Frontend
│
└── README.md             # המדריך הזה
```

## 🔌 API Endpoints

### Backend API

**Base URL**: `http://localhost:5000/api`

#### חוזים
- `GET /contracts` - קבלת רשימת חוזים
  - Query params: `page`, `limit`, `startDate`, `endDate`
- `POST /contracts/search` - חיפוש חוזים עם פילטרים
  - Body: `{ keywords, startDate, endDate, minAmount, maxAmount }`

#### סטטיסטיקות
- `GET /statistics` - סטטיסטיקות כלליות
- `GET /contracts/by-year` - חוזים לפי שנה
- `GET /contracts/by-agency` - חוזים לפי גורם ממשלתי

#### כלים
- `GET /health` - בדיקת תקינות השרת
- `POST /cache/clear` - ניקוי cache

## 🎨 טכנולוגיות

### Backend
- **Express.js** - Web framework
- **Axios** - HTTP client לקריאת APIs חיצוניים
- **Node-Cache** - מנגנון caching לשיפור ביצועים
- **CORS** - תמיכה ב-cross-origin requests

### Frontend
- **React 18** - ספריית UI
- **React Router** - ניווט בין עמודים
- **Recharts** - ספריית גרפים וויזואליזציות
- **Axios** - תקשורת עם Backend
- **Date-fns** - עיבוד תאריכים

## 🔧 התאמה אישית

### הוספת מקורות נתונים נוספים

ערוך את [backend/server.js](backend/server.js) והוסף פונקציות נוספות לשליפת נתונים:

```javascript
// דוגמה להוספת API של בריטניה
async function searchUKContracts() {
  const response = await axios.get('UK_API_URL', {
    headers: { 'Authorization': process.env.UK_API_KEY }
  });
  return response.data;
}
```

### שינוי עיצוב

כל קומפוננט מגיע עם קובץ CSS נפרד:
- `Dashboard.css` - דשבורד
- `ContractsList.css` - רשימת חוזים
- `Analytics.css` - ניתוח
- `Search.css` - חיפוש
- `App.css` - עיצוב כללי

## 📊 דוגמאות שימוש

### חיפוש חוזים לפי תקופה
```javascript
const response = await axios.post('http://localhost:5000/api/contracts/search', {
  startDate: '2020-01-01',
  endDate: '2023-12-31',
  minAmount: 1000000
});
```

### קבלת סטטיסטיקות
```javascript
const stats = await axios.get('http://localhost:5000/api/statistics');
console.log(stats.data.totalValue); // סה"כ שווי חוזים
```

## 🚢 הכנה לפריסה

### Build לייצור

```bash
cd frontend
npm run build
```

הקבצים הסטטיים ייווצרו בתיקיית `frontend/build/`

### העלאה לשרת

1. העלה את תיקיית `backend/` לשרת
2. העלה את תיקיית `frontend/build/` לשרת סטטי (Netlify, Vercel, וכו')
3. עדכן את משתני הסביבה (`PORT`, API URLs)

## 🔐 אבטחה

- השרת כולל CORS מוגדר
- מידע רגיש נשמר במשתני סביבה (`.env`)
- Cache מקומי למניעת עומס על APIs חיצוניים

## 🤝 תמיכה ופיתוח עתידי

### תכונות מתוכננות
- [ ] תמיכה ב-APIs של מדינות נוספות (UK, Canada, Australia)
- [ ] התראות על חוזים חדשים
- [ ] דוחות PDF אוטומטיים
- [ ] ניתוח NLP של תיאורי חוזים
- [ ] מערכת התראות בזמן אמת
- [ ] Dashboard מותאם אישית למשתמש

## 📝 רישיון

MIT License - ראה קובץ LICENSE למידע נוסף

## 👨‍💻 מפתח

נבנה עבור אנדוריל תעשיות - מערכת מעקב וניתוח חוזים מתקדמת

---

**הערה**: מערכת זו משתמשת בנתונים ציבוריים מ-USASpending.gov API. הנתונים מתעדכנים באופן תקופתי על ידי ממשלת ארצות הברית.
