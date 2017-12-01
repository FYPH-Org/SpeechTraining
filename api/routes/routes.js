const express = require('express');

const routes = (server) => {
  const speechAnalysisControllers = require('../controllers/speechAnalysisControllers');

  const apiRoutes = express.Router();

  // app.com/api/test
  apiRoutes.route('/test')
    .get(speechAnalysisControllers.test)


  server.use('/api', apiRoutes);
};

module.exports = { routes };
