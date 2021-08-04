import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

//routes (users)
router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);
router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default router;
