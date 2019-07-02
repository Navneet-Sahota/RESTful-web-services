const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

if (process.env.ENV === "Test") {
	console.log("This is running on Test DB");
	const db = mongoose.connect("mongodb://localhost/bookAPI_test", {
		useNewUrlParser: true,
	});
} else {
	console.log("This is running on Production DB");
	const db = mongoose.connect("mongodb://localhost/bookAPI", {
		useNewUrlParser: true,
	});
}
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
	res.send("Welcome to my API!!");
});

app.server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
