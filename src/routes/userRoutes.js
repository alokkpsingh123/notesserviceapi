const express = require("express");
const { signup, singin, signout } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", singin);

userRouter.delete("/signout/:id", signout);

module.exports = userRouter;
