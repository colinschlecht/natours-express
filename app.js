import express from "express";

const app = express();

app.get("/api/v1/tuors", (req, res) => {
    
})

const port = 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
