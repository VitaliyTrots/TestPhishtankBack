const checkService = require('../services/check.service');

class CheckController {
  async checkUrl(req, res) {
    try {
      const data = await checkService.checkUrl(req.body.url);
      res.send(data);
    } catch (err) {
      console.error(err)
      res.status(err.status || 400).send(err.message);
    };
  };
};

module.exports = new CheckController();
