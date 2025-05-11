const express = require('express');
const app = express();
const PORT = 3000;

let proverbs = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const search = req.query.search || '';
  const filtered = proverbs.filter(p => 
    p.text.includes(search) || p.meaning.includes(search)
  );
  res.render('index', { proverbs: filtered, search });
});

app.post('/add', (req, res) => {
  const { proverb, meaning } = req.body;
  if (proverb && meaning) {
    proverbs.push({ text: proverb, meaning });
  }
  res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index)) {
    proverbs.splice(index, 1);
  }
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
