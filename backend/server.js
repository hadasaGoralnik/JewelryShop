const express = require('express');
const { MongoClient } = require('mongodb');
//using mongodb

const path = require('path');
const bodyParser = require('body-parser'); // Middleware to parse JSON request bodies

//url for mongo & creating client for the DB
const uri = "mongodb+srv://lilachshekter:5rX3jJ3e@cluster0.6ctfz.mongodb.net/";
const client = new MongoClient(uri);
// התחברות ל-MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

////////////////////////////////////////////
async function connectToMongoDB() {
  try {
      await client.connect();
      console.log("Connected to MongoDB");
      
      // הוסיפי כאן פעולות על מסד הנתונים אם יש צורך

  } catch (error) {
      console.error("Error connecting to MongoDB:", error);
  }
}


const app = express();
const port = 3001; 

// משתמשים זמניים (מאגר משתמשים מדומה)
const users = {};

// Middleware להגדרת תיקיית frontend כמקור לקבצים סטטיים ולניתוח בקשות JSON
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(bodyParser.json());

// ניתוב לדף הבית
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/home.html'));
});

// ניתוב להרשמת משתמש
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // בדיקה אם המשתמש כבר קיים
  if (users[username]) {
    return res.status(400).json({ message: 'שם המשתמש כבר קיים' });
  }

  // הוספת המשתמש ל"מאגר" הזמני
  users[username] = { email, password };
  res.status(201).json({ message: 'המשתמש נרשם בהצלחה' });
});

// ניתוב לכניסת משתמש
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // בדיקה אם המשתמש קיים ואם הסיסמה תואמת
  if (!users[username] || users[username].password !== password) {
    return res.status(400).json({ message: 'שם המשתמש או הסיסמה שגויים' });
  }

  res.status(200).json({ message: 'המשתמש נכנס בהצלחה', username });
});

// ניתוב ליציאת משתמש
app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'המשתמש יצא בהצלחה' });
});

// ניתוב למחיקת משתמש
app.post('/deleteUser', (req, res) => {
  const { username } = req.body;

  // מחיקת המשתמש אם הוא קיים
  if (!users[username]) {
    return res.status(400).json({ message: 'המשתמש לא קיים' });
  }

  delete users[username];
  res.status(200).json({ message: 'המשתמש נמחק בהצלחה' });
});

connectToMongoDB();

// הפעלת השרת על הפורט המוגדר
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

