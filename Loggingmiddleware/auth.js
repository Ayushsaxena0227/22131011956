const axios = require("axios");

let token = "";

const getBearerToken = async () => {
  if (token) return token;

  const credentials = {
    email: "ayush.22scse1012055@galgotiasuniversity.edu.in",
    name: "Ayush saxena",
    rollNo: "22131011956",
    accessCode: "Muagvq",
    clientID: "3f9c6852-e176-4e60-af11-d3f2b629c39a",
    clientSecret: "eHSxranSjWEJxxkv",
  };

  const res = await axios.post(
    "http://20.244.56.144/evaluation-service/auth",
    credentials
  );
  token = res.data?.access_token;
  return token;
};

module.exports = getBearerToken;
