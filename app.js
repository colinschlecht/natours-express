import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

console.log(process.env.COOLEST)
const app = express();

//middleware
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
  }

  console.log(process.env.NODE_ENV)

app.use((req, res, next) => {
	console.log("hello from the middleware");
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

//routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;
