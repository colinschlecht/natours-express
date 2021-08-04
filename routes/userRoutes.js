import express from "express";

const router = express.Router();

const getAllUsers = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route not yet defined",
	});
};

const getUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route not yet defined",
	});
};
const createUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route not yet defined",
	});
};
const updateUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route not yet defined",
	});
};
const deleteUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route not yet defined",
	});
};

//routes (users)
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);


export default router