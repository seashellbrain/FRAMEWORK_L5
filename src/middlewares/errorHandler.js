module.exports = function errorHandler(err, req, res, next) {
    console.error('Ошибка:', err);
    res.statusCode = 500;
    res.json({ error: 'Внутренняя ошибка сервера' });
  };
  