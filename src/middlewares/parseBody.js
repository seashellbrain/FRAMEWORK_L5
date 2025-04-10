module.exports = function parseBody(req, res, next) {
    req.body = {};
    let data = '';
  
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        req.body = JSON.parse(data);
      } catch {
        req.body = {};
      }
      next();
    });
  };
  