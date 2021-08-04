import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

const getAllTours = (req, res) => {
	res.status(200).json({
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

const postTuor = (req, res) => {
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

app.get("/api/v1/tours/:id", getTour);
app.get("/api/v1/tours", getAllTours);
app.post("/api/v1/tours", postTuor);
app.patch(`/api/v1/tours/:id`, updateTour);
app.delete(`/api/v1/tours/:id`, deleteTuor);

const port = 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
