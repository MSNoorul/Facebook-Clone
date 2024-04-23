// this is for handle routes esay way
// the middleware must return true to go to next function

class Router {
  constructor(request, response) {
    this._req = request;
    this._res = response;
  }

  get(path, ...callbacks) {
    const url = new RegExp(path);
    const pathname = this._req.url
    if (this._req.method === "GET" && url.test(pathname)) {
      for (let callback of callbacks) {
        const breakvalue = callback(this._req, this._res, pathname);
        if (!breakvalue) break;
      }
    }
  }

  post(path, ...callbacks) {
    const url = new RegExp(path);
    const pathname = this._req.url
    if (this._req.method === "POST" && url.test(pathname)) {
      for (let callback of callbacks) {
        const breakvalue = callback(this._req, this._res, pathname);
        if (!breakvalue) break;
      }
    }
  }
  update(path, ...callbacks) {
    const url = new RegExp(path);
    const pathname = this._req.url
    if (this._req.method === "PUT" && url.test(pathname)) {
      for (let callback of callbacks) {
        const breakvalue = callback(this._req, this._res, pathname);
        if (!breakvalue) break;
      }
    }
  }
  delete(path, ...callbacks) {
    const url = new RegExp(path);
    const pathname = this._req.url
    if (this._req.method === "DELETE" && url.test(pathname)) {
      for (let callback of callbacks) {
        const breakvalue = callback(this._req, this._res, pathname);
        if (!breakvalue) break;
      }
    }
  }

  // All(...callbacks){
  //   const url = new RegExp('.*');
  //   const pathname = this._req.url
  //   if (url.test(pathname)) {
  //     for (let callback of callbacks) {
  //       const breakvalue = callback(this._req, this._res, pathname);
  //       if (!breakvalue) break;
  //     }
  //   }

  // }
}

module.exports = Router;
