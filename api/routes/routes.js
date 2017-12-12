const express = require('express');
const speechAnalysisControllers = require('../controllers/speechAnalysisControllers');
const userControllers = require('../controllers/user');
// test comment.

const routes = (server) => {

  const apiRoutes = express.Router();

  // app.com/api/test
  apiRoutes.route('/test')
    .get(speechAnalysisControllers.test);



  // db test route
  apiRoutes.route('/dbtest')
    .post(speechAnalysisControllers.dbtest);

  // Sentiment
  apiRoutes.route('/sentiment')
    .post(speechAnalysisControllers.sentiment);

  apiRoutes.route('/grammar')
    .post(speechAnalysisControllers.grammar);

  // user routes
  apiRoutes.route('/register')
    .post(userControllers.register);

  server.use('/api', apiRoutes);
};

module.exports = { routes };
