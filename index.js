const express = require("express");
const logger = require("./Loggingmiddleware/logger");
const shortenerRoutes = require("./routes/shortner");

const app = express();
app.use(express.json());
app.use(logger);
app.use("/", shortenerRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`URL Shortener running at http://localhost:${PORT}`);
});
