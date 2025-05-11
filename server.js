const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Load existing proverbs
let proverbs = require('./proverbs.json');

// API to get all proverbs
app.get('/api/proverbs', (req, res) => {
  res.json(proverbs);
});

// API to add new proverb
app.post('/api/proverbs', (req, res) => {
  const newProverb = req.body;
  proverbs.push(newProverb);
  fs.writeFileSync('./proverbs.json', JSON.stringify(proverbs, null, 2));
  res.status(201).json(newProverb);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
