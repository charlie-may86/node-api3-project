const Users = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC

  console.log(`This is the request method: ${req.method}`);
  console.log(`This is the request url: ${req.url}`);
  console.log(`This is when the request took place: ${req.timestamp}`);
  next();
}

function validateUserId(req, res, next) {
  const id = req.params.id;
  console.log("this is the validate thing");
  Users.getById(id)
    .then((user) => {
      if (user) {
        console.log(user);
        console.log(req);
        next();
      } else {
        next({ message: `user with id: ${id} not found` });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId };
