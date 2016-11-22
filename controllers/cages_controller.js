var CagesController = {};

CagesController.index = function(req, res) {
  res.sendFile('../views/default.html', { root: __dirname });
}

module.exports = CagesController;
