const http = require('http');
const Router = require('./router');

const { enhanceRequest } = require('./request');
const { enhanceResponse } = require('./response');

const emitter = require('./emitter');

class App {
  constructor() {
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
      enhanceRequest(req);
      enhanceResponse(res);

      req.on('end', () => {
        let idx = 0;

        const next = () => {
          const middleware = this.middlewares[idx++];
          if (middleware) {
            middleware(req, res, next);
          } else {
            this.handleRequest(req, res);
          }
        };

        next();
      });
    });

    server.listen(port, callback);
  }
}

module.exports = App;
