document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('proverbForm');
  const list = document.getElementById('proverbList');
  const search = document.getElementById('search');

  // Load all proverbs
  fetch('/api/proverbs')
    .then(res => res.json())
    .then(data => showProverbs(data));

  form.addEventListener('submit', e => {
    e.preventDefault();

    const newProverb = {
      text: document.getElementById('text').value,
      meaning: document.getElementById('meaning').value,
      language: document.getElementById('language').value,
    };

    fetch('/api/proverbs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProverb),
    })
      .then(res => res.json())
      .then(data => {
        list.innerHTML += `<li><strong>${data.text}</strong> (${data.language}): ${data.meaning}</li>`;
        form.reset();
      });
  });

  // Filter by search
  search.addEventListener('input', () => {
    const query = search.value.toLowerCase();
    fetch('/api/proverbs')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p =>
          p.text.toLowerCase().includes(query) ||
          p.meaning.toLowerCase().includes(query) ||
          p.language.toLowerCase().includes(query)
        );
        showProverbs(filtered);
      });
  });

  function showProverbs(proverbs) {
    list.innerHTML = '';
    proverbs.forEach(p => {
      list.innerHTML += `<li><strong>${p.text}</strong> (${p.language}): ${p.meaning}</li>`;
    });
  }
});
