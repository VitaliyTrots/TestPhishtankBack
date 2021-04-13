const checkRoute = require('./check.route');

module.exports = app => {
  app.use('/check', checkRoute);

  app.use('*', (req, res) => res.status(404).send('Not Found.'));
};
