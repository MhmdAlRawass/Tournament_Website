const express = require("express");
const cors = require("cors");

require("dotenv").config();

const tournamentRoutes = require("./routes/tournamentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api", tournamentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});
