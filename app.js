import express from "express";
import fs from "fs";

const app = express();

const tuors = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));
app.get("/api/v1/tuors", (req, res) => {
	res.status(200).json({
		status: "success",
		results: tuors.length,
		data: {
			tuors,
		},
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
