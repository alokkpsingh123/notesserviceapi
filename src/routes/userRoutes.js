const express = require("express");
const { signup, singin } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", singin);

module.exports = userRouter;
