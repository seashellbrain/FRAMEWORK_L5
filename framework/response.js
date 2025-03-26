function enhanceResponse(res) {
    res.send = (data) => {
      if (typeof data === 'string') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8'); // <-- вот это важно
        res.end(data);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      }
    };
  
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(data));
    };
  
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
  }
  module.exports = { enhanceResponse };
