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
  
    get(path, handler) { this.router.register('GET', path, handler); }
    post(path, handler) { this.router.register('POST', path, handler); }
    put(path, handler) { this.router.register('PUT', path, handler); }
    patch(path, handler) { this.router.register('PATCH', path, handler); }
    delete(path, handler) { this.router.register('DELETE', path, handler); }
  
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
                this.router.handle(req, res);
              }
            };
      
            next();
          });
        });
      
        server.listen(port, callback);
      }
    }
  
  module.exports = App;