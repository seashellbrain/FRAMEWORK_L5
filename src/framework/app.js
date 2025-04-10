const http = require('http');
const { EventEmitter } = require('events');
const Router = require('./router');

class App extends EventEmitter {
  constructor() {
    super();
    this.router = new Router();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  handleRequest(req, res) {
    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    const result = this.router.findHandler(method, path);

    if (result) {
      req.query = Object.fromEntries(url.searchParams);
      req.params = result.params;
      return result.handler(req, res);
    }

    res.statusCode = 404;
    res.end('Not found');
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => {
      this.emit('request', req.url);

      let idx = 0;

      const next = (err) => {
        if (err) {
          const errorHandler = this.middlewares.find(mw => mw.length === 4);
          if (errorHandler) return errorHandler(err, req, res, next);
          res.statusCode = 500;
          return res.end('Internal Server Error');
        }

        const middleware = this.middlewares[idx++];
        if (middleware) {
          try {
            if (middleware.length === 4) {
              next(); // skip error middlewares
            } else {
              middleware(req, res, next);
            }
          } catch (error) {
            next(error);
          }
        } else {
          this.handleRequest(req, res);
        }
      };

      next();
    });

    server.listen(port, callback);
  }

  get(path, handler) {
    this.router.get(path, handler);
  }

  post(path, handler) {
    this.router.post(path, handler);
  }

  put(path, handler) {
    this.router.put(path, handler);
  }

  patch(path, handler) {
    this.router.patch(path, handler);
  }

  delete(path, handler) {
    this.router.delete(path, handler);
  }
}

module.exports = App;
