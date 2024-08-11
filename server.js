// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies in requests

// Create a connection to the MySQL database
// const db = mysql.createConnection({
//   host: 'localhost',      // Replace with your MySQL host (usually 'localhost')
//   user: 'root',           // Replace with your MySQL username
//   password: '',           // Replace with your MySQL password
//   database: 'tuf' // Replace with your database name
// });
// const db = mysql.createConnection({
//   host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',      // Replace with your MySQL host (usually 'localhost')
//   user: '2W2KSkiXfx1psVX.root',           // Replace with your MySQL username
//   password: '7VVk1jQjpqql9PgA',           // Replace with your MySQL password
//   database: 'test' // Replace with your database name
// });
const url = require('url');

const connectionString = 'mysql://2W2KSkiXfx1psVX.root:7VVk1jQjpqql9PgA@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/tuf?ssl={"rejectUnauthorized":true}';
const connectionUrl = new url.URL(connectionString);

const dbConfig = {
  host: connectionUrl.hostname,
  port: connectionUrl.port,
  user: connectionUrl.username,
  password: connectionUrl.password,
  database: connectionUrl.pathname.split('/')[1],
  ssl: JSON.parse(connectionUrl.searchParams.get('ssl'))
};

// Create a connection to the MySQL database
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});




app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM cards', (err, results) => {
    if (err) {
      console.error('Error fetching flashcards:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/flashcards', (req, res) => {
    console.log(req.body);
  const { question, answer,topic,youtube } = req.body;
  db.query('INSERT INTO cards (question, answer,topic,youtube) VALUES (?, ?,?,?)', [question, answer,topic,youtube], (err, results) => {
    if (err) {
      console.error('Error adding flashcard:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: results.insertId, question, answer });
  });
});

app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer,topic,youtube } = req.body;
  db.query(

    'UPDATE cards SET question = ?, answer = ?, topic = ?, youtube = ? WHERE id = ?',
    [question, answer, topic, youtube, parseInt(id)],
     (err, results) => {
      if (err) {
        console.error('Error updating flashcard:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Flashcard updated successfully' });
    }
  );
});

app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM cards WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting flashcard:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Flashcard deleted successfully' });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
