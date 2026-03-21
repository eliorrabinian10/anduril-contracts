# ⚡ התחלה מהירה - 3 דקות

## דרך 1: הרצה אוטומטית (מומלץ)

### Windows:
```bash
# פשוט לחץ פעמיים על הקובץ
start.bat
```

### Mac/Linux:
```bash
chmod +x start.sh
./start.sh
```

זהו! המערכת תתקין את עצמה ותתחיל לרוץ אוטומטית.

---

## דרך 2: הרצה ידנית

### צעד 1 - Backend (טרמינל 1)
```bash
cd backend
npm install
npm start
```

### צעד 2 - Frontend (טרמינל 2)
```bash
cd frontend
npm install
npm start
```

---

## ✅ איך לדעת שהכל עובד?

### Backend: http://localhost:5000
נסה לבקר ב: http://localhost:5000/api/health

אמור להציג:
```json
{"status":"OK","timestamp":"..."}
```

### Frontend: http://localhost:3000
הדפדפן יפתח אוטומטית ותראה את הדשבורד!

---

## 🎯 מה עכשיו?

1. **דשבורד** - סקירה כללית של כל החוזים
2. **חוזים** - רשימה מפורטת עם מיון וסינון
3. **ניתוח פיננסי** - גרפים וסטטיסטיקות מתקדמות
4. **חיפוש מתקדם** - חפש עם פילטרים + ייצוא CSV

---

## ⚠️ בעיות?

**השרת לא עולה?**
- וודא שיש לך Node.js 16+
- בדוק שאין תהליך אחר על port 5000

**הנתונים לא נטענים?**
- וודא שהאינטרנט פועל
- USASpending.gov API צריך להיות זמין

**עוד שאלות?**
קרא את [INSTALL.md](INSTALL.md) למדריך מפורט

---

## 🚀 טיפ מקצועי

אחרי ההתקנה הראשונה, בפעמים הבאות פשוט:
```bash
# Backend
cd backend && npm start

# Frontend (בטרמינל אחר)
cd frontend && npm start
```

**זמן הרצה: ~10 שניות!** ⚡
