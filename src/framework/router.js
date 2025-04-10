class Router {
  constructor() {
    this.routes = {};
  }

  register(method, path, handler) {
    if (!this.routes[method]) this.routes[method] = [];

    const parts = path.split('/').filter(Boolean);
    const paramNames = parts
      .filter(p => p.startsWith(':'))
      .map(p => p.slice(1)); 

    this.routes[method].push({
      parts,
      handler,
      paramNames
    });
  }

  matchRoute(path, route) {
    const urlParts = path.split('/').filter(Boolean);
    if (urlParts.length !== route.parts.length) return null;

    const params = {};

    for (let i = 0; i < route.parts.length; i++) {
      const routePart = route.parts[i];
      const urlPart = urlParts[i];

      if (routePart.startsWith(':')) {
        params[routePart.slice(1)] = urlPart;
      } else if (routePart !== urlPart) {
        return null;
      }
    }

    return params;
  }

  findHandler(method, path) {
    const routes = this.routes[method] || [];

    for (const route of routes) {
      const params = this.matchRoute(path, route);
      if (params) {
        return { handler: route.handler, params };
      }
    }

    return null;
  }

  get(path, handler) {
    this.register('GET', path, handler);
  }

  post(path, handler) {
    this.register('POST', path, handler);
  }

  put(path, handler) {
    this.register('PUT', path, handler);
  }

  patch(path, handler) {
    this.register('PATCH', path, handler);
  }

  delete(path, handler) {
    this.register('DELETE', path, handler);
  }
}

module.exports = Router;
