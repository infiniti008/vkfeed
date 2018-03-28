const https = require("https");
const url = "https://vk.com/habr?w=wall-20629724_1060593";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    // body = JSON.parse(body);
    console.log(body);
  });
});