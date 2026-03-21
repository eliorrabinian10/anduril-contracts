# 🚀 מדריך התקנה מהיר

## התקנה במערכת Windows

### שלב 1: התקן Node.js
1. הורד את Node.js מ: https://nodejs.org/
2. הרץ את המתקין ועקוב אחר ההוראות
3. וודא שה-PATH מוגדר נכון

### שלב 2: הורד את הפרויקט
```bash
# אם יש לך Git
git clone <repository-url>
cd Anduril-Project

# או פשוט הורד כ-ZIP ופתח
```

### שלב 3: הרץ את Backend
פתח Command Prompt או PowerShell:

```bash
cd backend
npm install
npm start
```

אתה אמור לראות:
```
🚀 Anduril Contracts API Server running on port 5000
📊 API endpoint: http://localhost:5000/api
```

### שלב 4: הרץ את Frontend
פתח חלון Command Prompt/PowerShell **חדש**:

```bash
cd frontend
npm install
npm start
```

הדפדפן יפתח אוטומטית ב-`http://localhost:3000`

---

## התקנה במערכת Mac/Linux

### שלב 1: התקן Node.js
```bash
# Mac (עם Homebrew)
brew install node

# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### שלב 2: הורד ההפעל
```bash
cd Anduril-Project

# Backend
cd backend
npm install
npm start &

# Frontend (בטרמינל חדש)
cd ../frontend
npm install
npm start
```

---

## בעיות נפוצות ופתרונות

### ❌ "npm: command not found"
**פתרון**: התקן Node.js מחדש ווודא שה-PATH מוגדר

### ❌ "Port 5000 is already in use"
**פתרון**: שנה את ה-PORT בקובץ `.env`:
```bash
cd backend
echo "PORT=5001" > .env
```

### ❌ "Cannot connect to server"
**פתרון**: וודא שה-Backend רץ על port 5000:
```bash
curl http://localhost:5000/api/health
```

### ❌ שגיאות התקנה
**פתרון**: נקה cache ונסה שוב:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## בדיקה מהירה

### בדוק שהכל עובד:

1. **Backend Health Check**:
   ```bash
   curl http://localhost:5000/api/health
   ```
   תקבל: `{"status":"OK","timestamp":"..."}`

2. **Frontend**: פתח דפדפן ב-`http://localhost:3000`

3. **API Test**: נסה לקבל חוזים:
   ```bash
   curl http://localhost:5000/api/contracts
   ```

---

## הרצה במצב פיתוח

### Backend עם Auto-reload
```bash
cd backend
npm install -g nodemon  # פעם אחת
npm run dev
```

### Frontend עם Hot Reload
Frontend כבר מגיע עם hot reload מובנה דרך `npm start`

---

## שאלות נפוצות

**Q: האם אני צריך להריץ שני טרמינלים?**
A: כן! אחד ל-Backend ואחד ל-Frontend

**Q: איפה הנתונים נשמרים?**
A: הנתונים נשמרים ב-cache בזיכרון. אין צורך ב-Database

**Q: האם יש צורך באינטרנט?**
A: כן, המערכת מושכת נתונים מ-USASpending.gov API

**Q: איך אני עוצר את השרתים?**
A: לחץ `Ctrl+C` בכל אחד מהטרמינלים

---

## הרצה עם סקריפט אחד (Linux/Mac)

צור קובץ `start.sh`:

```bash
#!/bin/bash

# Start Backend
cd backend
npm install
npm start &
BACKEND_PID=$!

# Start Frontend
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Press Ctrl+C to stop all servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
```

הרץ:
```bash
chmod +x start.sh
./start.sh
```

---

## צריך עזרה?

1. בדוק את [README.md](README.md) למידע מפורט
2. וודא שיש לך Node.js 16+: `node --version`
3. בדוק את ה-console logs לשגיאות
4. נסה להתקין מחדש: `rm -rf node_modules && npm install`

🎉 **בהצלחה!**
