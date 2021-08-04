//tour controller
import fs from "fs";

const tourController = {}

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

tourController.getAllTours = (req, res) => {
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

tourController.getTour = (req, res) => {
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

tourController.createTour = (req, res) => {
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

tourController.updateTour = (req, res) => {
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

tourController.deleteTuor = (req, res) => {
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

export default tourController