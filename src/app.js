const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const cors = require('cors')
const ENV = require("./config/env");
const InitMongo = require("./mongoose.initializer");
const UsersRoutes = require("./routes/users.routes");
const DishesRoutes = require("./routes/dishes.routes");
const AuthRoutes = require("./routes/auth.routes");

// Init
const app = express();

InitMongo();

// Middlewares
app.use(express.json());
app.use(cors())
app.use("/static", express.static("./Uploads"));

// Routes

app.use("/dishes", DishesRoutes);
app.use("/users", UsersRoutes);
app.use("/auth", AuthRoutes);

// Listener
app.listen(ENV.port, () => console.log("Listening on port: " + ENV.port));
