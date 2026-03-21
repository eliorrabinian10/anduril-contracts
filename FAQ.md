# ❓ שאלות נפוצות (FAQ)

## כללי

### מה זה המערכת הזאת?
מערכת מעקב וניתוח חוזים עבור אנדוריל תעשיות. המערכת מושכת נתונים מ-USASpending.gov API ומציגה אותם בדשבורד אינטראקטיבי עם גרפים, ניתוח פיננסי וחיפוש מתקדם.

### האם אני צריך לשלם כסף?
לא! המערכת משתמשת ב-APIs ציבוריים חינמיים. הכל open source.

### האם הנתונים מדויקים?
כן! הנתונים מגיעים ישירות מממשלת ארצות הברית (USASpending.gov), מקור רשמי ומהימן.

---

## התקנה והרצה

### איזה גרסת Node.js אני צריך?
Node.js 16 ומעלה. בדוק עם: `node --version`

### האם אני צריך database?
לא! המערכת משתמשת ב-cache בזיכרון ושולפת נתונים מה-API בזמן אמת.

### כמה זמן לוקח ההתקנה?
- התקנה ראשונה: ~3-5 דקות (תלוי במהירות האינטרנט)
- הרצות הבאות: ~10 שניות

### למה אני צריך שני טרמינלים?
אחד מריץ את Backend (שרת ה-API) והשני את Frontend (ממשק המשתמש). הם עובדים ביחד אבל כתהליכים נפרדים.

---

## שימוש במערכת

### איך אני רואה חוזים חדשים?
המערכת שולפת נתונים עדכניים מה-API. לחץ על "רענן נתונים" בכל עמוד.

### איך אני מייצא נתונים?
בעמוד "חיפוש מתקדם", לאחר חיפוש, לחץ על "ייצא ל-CSV".

### האם יש הגבלה על כמות החוזים?
Backend מגביל ל-100 חוזים בקריאת API אחת, אבל אפשר לעבור בין עמודים (pagination).

### מדוע יש cache?
כדי לא להעמיס על ה-API החיצוני ולשפר ביצועים. ה-cache מתרענן כל שעה.

---

## טכני

### איך לנקות את ה-cache?
```bash
curl -X POST http://localhost:5000/api/cache/clear
```
או רק הפעל מחדש את ה-Backend.

### איך לשנות את ה-port?
**Backend**:
```bash
cd backend
echo "PORT=5001" > .env
npm start
```

**Frontend**: ערוך את `.env` בתיקיית frontend.

### איך להוסיף מדינות נוספות?
ערוך את `backend/server.js` והוסף פונקציות חדשות לשליפת נתונים מ-APIs אחרים. דוגמה:
```javascript
async function searchUKContracts() {
  // הוסף קוד לשליפה מ-UK Contracts Finder
}
```

### האם יש API documentation?
כן! ראה בקובץ [README.md](README.md) סעיף "API Endpoints".

---

## בעיות נפוצות

### "Cannot GET /api/contracts"
**סיבה**: Backend לא רץ או רץ על port אחר.
**פתרון**: וודא ש-Backend רץ על port 5000.

### "Failed to fetch"
**סיבות אפשריות**:
1. Backend לא רץ
2. אין אינטרנט
3. USASpending.gov API לא זמין

**פתרון**: בדוק את console logs ב-browser ו-backend terminal.

### "Port already in use"
**סיבה**: יש כבר תהליך על port 5000 או 3000.
**פתרונות**:
```bash
# Mac/Linux - הרוג תהליך על port 5000
lsof -ti:5000 | xargs kill -9

# Windows - הרוג תהליך על port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "npm: command not found"
**סיבה**: Node.js לא מותקן או לא ב-PATH.
**פתרון**: התקן Node.js מ-https://nodejs.org/

### הנתונים לא מתעדכנים
**פתרון**: נקה cache ורענן:
```bash
curl -X POST http://localhost:5000/api/cache/clear
```
ואז לחץ "רענן נתונים" בממשק.

---

## ביצועים

### המערכת איטית
**טיפים**:
1. וודא שיש חיבור אינטרנט יציב
2. סגור תוכנות כבדות אחרות
3. נקה cache של הדפדפן
4. הגדל את זמן ה-cache בקוד (ברירת מחדל: 1 שעה)

### הגרפים לא נטענים
**פתרון**:
1. בדוק console בדפדפן (F12)
2. וודא שיש נתונים (בקר ב-http://localhost:5000/api/statistics)
3. רענן את הדף (Ctrl+R)

---

## פיתוח

### איך להוסיף תכונה חדשה?
1. Backend: הוסף endpoint חדש ב-`server.js`
2. Frontend: צור קומפוננטה חדשה בתיקיית `src/components`
3. הוסף route ב-`App.js`

### איך לשנות עיצוב?
כל קומפוננט יש לו קובץ CSS משלו:
- `Dashboard.css`
- `ContractsList.css`
- `Analytics.css`
- `Search.css`

### איך להריץ במצב פיתוח?
Backend:
```bash
npm install -g nodemon
cd backend
npm run dev
```

Frontend כבר במצב dev ברירת מחדל עם hot reload.

### איך ליצור build לייצור?
```bash
cd frontend
npm run build
```
הקבצים יהיו ב-`frontend/build/`

---

## אבטחה

### האם המערכת בטוחה?
כן! המערכת:
- ✅ לא שומרת סיסמאות
- ✅ משתמשת ב-CORS
- ✅ לא חושפת מפתחות API
- ✅ קוד open source

### איך להוסיף אימות משתמשים?
כרגע אין אימות כי זה פרויקט לוקאלי. להוספת authentication:
1. התקן passport.js או JWT
2. הוסף middleware ל-Express
3. צור מערכת login ב-Frontend

---

## שיתוף המערכת

### איך לשתף עם אחרים?
**אופציה 1**: שתף את התיקייה
```bash
zip -r anduril-system.zip Anduril-Project/
```

**אופציה 2**: העלה ל-GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main
```

**אופציה 3**: פרוס לשרת (Heroku, DigitalOcean, וכו')

### איך להריץ על שרת?
1. העלה את `backend/` לשרת Node.js
2. העלה את `frontend/build/` לשרת סטטי (Netlify, Vercel)
3. עדכן את API URL ב-Frontend

---

## תמיכה

### איפה אני יכול לקבל עזרה?
1. קרא את [README.md](README.md)
2. בדוק את [INSTALL.md](INSTALL.md)
3. עיין ב-[FEATURES.md](FEATURES.md)

### מצאתי באג!
זה קורה. פתח issue או תקן בעצמך (זה open source!)

### יש לי רעיון לתכונה חדשה
מעולה! תרגיש חופשי להוסיף אותה או להציע אותה.

---

## שונות

### למה שיער המערכת בעברית?
כי זה מה שביקשת! 😊

### למה לא MongoDB/PostgreSQL?
כדי לשמור על הפשטות. אפשר להוסיף בקלות אם צריך.

### האם יש אפליקציה למובייל?
לא, אבל הממשק responsive ועובד מצוין במובייל.

### מה עם מדינות אחרות?
כרגע רק USA, אבל הארכיטקטורה מאפשרת הוספה קלה של מדינות נוספות.

---

**לא מצאת תשובה? שאל!** 💬
