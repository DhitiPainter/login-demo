const axios = require("axios").default;

// Note:
// We need to create a new Axios service instead of using
// the default Axios GET/POST/etc. methods, otherwise jest
// tests will throw "Error: Cross origin null forbidden"
// Refer: https://github.com/axios/axios/issues/191
const service = axios.create();

module.exports = {
  get: service.get,
  post: service.post,
  put: service.put,
  delete: service.delete,
  service
};
