const axios = require("axios");
const getBearerToken = require("./auth");

const logger = async (req, res, next) => {
  const token = await getBearerToken();

  const payload = {
    level: "debug",
    message: `${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    stack: "backend",
  };

  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Logging failed");
  }

  next();
};

module.exports = logger;
