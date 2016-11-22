var UsersController = {};

UsersController.index = function(req, res) {
  res.sendFile('home.html', { root: __dirname });
}

module.exports = UsersController;
