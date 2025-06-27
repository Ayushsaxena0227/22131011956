const axios = require("axios");
const getBearerToken = require("../auth");

const Log = async (stack, level, pkg, message) => {
  const token = await getBearerToken();

  const payload = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Failed to send log:", err.message);
  }
};

module.exports = Log;
