var CagesController = {};

CagesController.index = function(req, res) {
  res.sendFile('default.html', { root: __dirname });
}

module.exports = CagesController;
