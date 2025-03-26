class Router {
    constructor() {
      this.routes = {};
    }
  
    register(method, path, handler) {
      if (!this.routes[method]) this.routes[method] = [];
  

      const paramNames = [];
      const regexPath = path.replace(/:([^/]+)/g, (_, key) => {
        paramNames.push(key);
        return '([^/]+)';
      });
  
      const regex = new RegExp(`^${regexPath}$`);
      this.routes[method].push({ regex, handler, paramNames });
    }
  
    handle(req, res) {
      const method = req.method;
      const url = new URL(req.url, `http://${req.headers.host}`);
      const path = url.pathname;
  
      const routes = this.routes[method] || [];
  
      for (const route of routes) {
        const match = path.match(route.regex);
        if (match) {

          req.query = Object.fromEntries(url.searchParams);
          req.params = {};
          route.paramNames.forEach((name, i) => {
            req.params[name] = match[i + 1];
          });
  
          return route.handler(req, res);
        }
      }
  
      res.statusCode = 404;
      res.end('Not found');
    }
  }
  
  module.exports = Router;
  