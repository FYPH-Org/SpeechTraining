const express = require('express');

// test comment.

const routes = (server) => {
  const speechAnalysisControllers = require('../controllers/speechAnalysisControllers');

  const apiRoutes = express.Router();

  // app.com/api/test
  apiRoutes.route('/test')
    .get(speechAnalysisControllers.test);



  // db test route
  apiRoutes.route('/dbtest')
  .post(speechAnalysisControllers.dbtest);


  server.use('/api', apiRoutes);
};

module.exports = { routes };
