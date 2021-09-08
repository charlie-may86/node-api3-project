const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
// The middleware functions also need to be required
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
// const validateUserId = require('../middleware/middleware')

const router = express.Router();

router.get("/", logger, (req, res, next) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:id", logger, validateUserId, (req, res) => {
  res.json(req.user);
});

router.post("/", logger, validateUser, (req, res, next) => {
  Users.insert({ name: req.name })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.put("/:id", logger, validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, { name: req.name })
    .then(() => {
      return Users.getById(req.params.id);
    })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.delete("/:id", logger, validateUserId, async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/posts", logger, validateUserId, async (req, res, next) => {
  try{
    const result = await Users.getUserPosts(req.params.id)
    res.json(result)
  }catch (err) {
    next(err)
  }
});

router.post("/:id/posts", logger, validateUserId, validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something tragic insde posts router happended",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
