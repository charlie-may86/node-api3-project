const Users = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`${method} to ${url} @ ${timestamp}`);

  next();
}

async function validateUserId(req, res, next) {
  // try {
  //   const user = await Users.getById(req.params.id)
  //   if (!user) {
  //     res.status(404).json({
  //       message: 'no such user'
  //     })
  //   } else {
  //     req.user = user
  //     next()
  //   }
  // } catch (err) {

  // }

  const id = req.params.id;

  Users.getById(id)
    .then((user) => {
      if (user) {
        console.log(user);
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  console.log("this is the validate user middleware");
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost };
