function enhanceRequest(req) {
    req.body = {};
    let data = '';
  
    req.on('data', chunk => {
      data += chunk;
    });
  
    req.on('end', () => {
      try {
        req.body = JSON.parse(data);
      } catch (e) {
        req.body = {};
      }
    });
  }
  
  module.exports = { enhanceRequest };
  