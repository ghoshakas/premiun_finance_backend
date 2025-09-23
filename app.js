const path = require("path");
const express = require("express");
const cors = require("cors");

// importing route modules
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userGroupRoutes = require("./routes/userGroupRoutes");
const centralFundRoutes = require("./routes/centralFundRoutes");
const contributionPlanRoutes = require("./routes/contributionPlanRoutes");
const inwardTransactionRoutes = require("./routes/inwardTransactionRoutes");
const outwardTransactionRoutes = require("./routes/outwardTransactionRoutes");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Registering all API routes with base path `/api`
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/user-groups", userGroupRoutes);
app.use("/api/central-funds", centralFundRoutes);
app.use("/api/contribution-plans", contributionPlanRoutes);
app.use("/api/inward-transactions", inwardTransactionRoutes);
app.use("/api/outward-transactions", outwardTransactionRoutes);

// Server configuration
const PORT = 5000;

// Start the Express server
app.listen(PORT, () => {
  process.stdout.write(`Server running on http://localhost:${PORT}\n`);
});

module.exports = app;
