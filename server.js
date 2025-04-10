const App = require('./src/framework/app');
const app = new App();

const enhanceResponse = require('./src/middlewares/enhanceResponse');
const parseBody = require('./src/middlewares/parseBody');
const errorHandler = require('./src/middlewares/errorHandler');


app.use(enhanceResponse);
app.use(parseBody);
app.use(errorHandler);


app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
