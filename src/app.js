require("dotenv").config();
const cors = require('cors')
const express = require("express");
const ENV = require("./config/env");

// Init
const app = express();
require("./mongoose.initializer");
require("./config/cloudinary.config")

// Middlewares
app.use(express.json());
app.use(cors())
app.use("/static", express.static("./Uploads"));

// Routes

app.use("/dishes", require("./routes/dishes.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/categories", require("./routes/categories.routes"));

// Listener
app.listen(ENV.port, () => console.log("Listening on port: " + ENV.port));
