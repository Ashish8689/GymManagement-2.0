const express = require("express");
const db = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

// For the custom env file
require("custom-env").env();

// Error connecting the database
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Modules Routers
const clientRouter = require("./routes/client.router");
const trainerRouter = require("./routes/trainer.router");
const loginRouter = require("./routes/login.router");
const gymRouter = require("./routes/gym.router");
const statsRouter = require("./routes/stats.router");
const adminRouter = require("./routes/admin.router");
const subscriptionRouter = require("./routes/subscription.router");
const equipmentCategoryRouter = require("./routes/equipmentCategory.router");

app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/client", clientRouter);
app.use("/trainer", trainerRouter);
app.use("/gym", gymRouter);
app.use("/stats", statsRouter);
app.use("/subscription", subscriptionRouter);
app.use("/equipmentCategory", equipmentCategoryRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
