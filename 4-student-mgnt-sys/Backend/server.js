const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server starting on http://localhost:${PORT}`);
});
