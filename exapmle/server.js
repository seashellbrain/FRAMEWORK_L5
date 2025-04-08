const App = require('../framework/app');
const app = new App();

const parseBody = require('../middlewares/parseBody');
const enhanceResponse = require('../middlewares/enhanceResponse');
const errorHandler = require('../middlewares/errorHandler');

app.on('request', (url) => {
  console.log(`Запрос к: ${url}`);
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(parseBody);
app.use(enhanceResponse);


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


app.use(errorHandler);

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
