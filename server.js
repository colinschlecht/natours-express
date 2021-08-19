import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./config.env" });
import app from "./app.js";

const DB = process.env.MONGO_DB.replace("<PASSWORD>", process.env.PASSWORD);

//mongoose is an object data modeling library (ODM)
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((con) => console.log("db connected"));

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
