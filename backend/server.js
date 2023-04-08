const express = require("express"); // The framework
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000; // Uses the port from the .env file OR if thats not available, uses port 3000 or whatever specified port.
const cors = require("cors");

connectDB();

const app = express(); // The app
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes")); // When sent to the endpoint '/api/goals' it uses the goalRoutes.js to handle it.

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`)); // We call this so the server can listen.
