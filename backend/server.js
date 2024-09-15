const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // הפורט שבו השרת ירוץ

// הגדרת תיקיית frontend כמקור לקבצים סטטיים
app.use(express.static(path.join(__dirname, '../frontend')));

// ניתוב לדף הבית
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/home.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
