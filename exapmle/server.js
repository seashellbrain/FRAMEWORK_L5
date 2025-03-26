const App = require('../framework/app');
const emitter = require('../framework/emitter');
const app = new App();


emitter.on('request', (url) => {
  console.log(`Запрос к: ${url}`);
});


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get('/', (req, res) => res.send('Это GET /'));

app.post('/post', (req, res) => {
  res.json({ type: 'POST', body: req.body });
});

app.put('/put', (req, res) => {
  res.json({ type: 'PUT', body: req.body });
});

app.patch('/patch', (req, res) => {
  res.json({ type: 'PATCH', body: req.body });
});

app.delete('/delete', (req, res) => {
  res.json({ type: 'DELETE' });
});


app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});


app.get('/search', (req, res) => {
  res.json({ query: req.query });
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
