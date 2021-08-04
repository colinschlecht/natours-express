import express from "express";
import fs from "fs";
import { get } from "http";
import morgan from "morgan";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
	console.log("hello from the middleware");
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

//route handlers

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

const getAllTours = (req, res) => {
	console.log(req.requestTime);
	res.status(200).json({
		requestedAt: req.requestTime,
		status: "success",
		results: tours.length,
		data: {
			tours,
		},
	});
};

const getTour = (req, res) => {
	const id = req.params.id * 1;
	const tour = tours.find((el) => el.id === id);
	if (!tour) {
		res.status(404).json({
			status: "fail",
			message: "invalid ID",
		});
	} else {
		res.status(200).json({
			status: "success",
			data: {
				tour,
			},
		});
	}
};

const createTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);
	tours.push(newTour);
	fs.writeFile(
		"./dev-data/data/tours-simple.json",
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: "success",
				data: {
					tour: newTour,
				},
			});
		}
	);
};

const updateTour = (req, res) => {
	const id = req.params.id * 1;
	const tour = tours.find((el) => el.id === id);
	if (!tour) {
		res.status(404).json({
			status: "fail",
			message: "invalid ID",
		});
	} else {
		//update a tour then return success
		res.status(200).json({
			status: "success",
			data: {
				tour: "updated tour",
			},
		});
	}
};

const deleteTuor = (req, res) => {
	const id = req.params.id * 1;
	const tour = tours.find((el) => el.id === id);
	if (!tour) {
		res.status(404).json({
			status: "fail",
			message: "invalid ID",
		});
	} else {
		//delete a tour then status 204 (content not found)
		res.status(204).json({
			status: "success",
			data: {
				tour: null,
			},
		});
	}
};

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

//routes
const tourRouter = express.Router();
const userRouter = express.Router();
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//routes (tours)
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTuor);

//routes (users)
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

//server
const port = 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
