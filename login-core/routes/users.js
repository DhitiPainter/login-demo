var authService = require("../services/auth.service");

module.exports = (router) => {
  /* Authenticate user */
  router.post("/authenticate", async function (req, res, next) {
    try {
      const { data } = await authService.Authenticate(req.body, res);
      return res.status(res.status ? res.status : 200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  /* Register new user */
  router.post("/register", async function (req, res, next) {
    try {
      const { data } = await authService.RegisterNewUser(req.body, res);
      return res.status(res.status ? res.status : 200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
