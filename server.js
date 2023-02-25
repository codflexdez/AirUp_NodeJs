const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const path = require("path");

const { PORT } = require("./config.js");
const { API_KEY } = require("./config.js");

app.use("/static", express.static(path.join(__dirname, "frontend/static")));

app.get("/*", (req, data) => {
  data.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(PORT || 4001, () => {
  console.log("Server is running", PORT);
});

const api_base = "https://airlabs.co/api/v9/";
   function apiCall(method, params, cb) {
    params.api_key = API_KEY;
    params.country_code = "CA";
    request.post({
        url: `${api_base}${method}`,
        form: params
      }, cb);
    }
     apiCall('airports',
   {
      param1: 'value1',
      param2: 'value2'
   },
     (err, res) => {
       fs.writeFile(__dirname + '/frontend/static/data.json', res.body, err => {
         if(err) throw err;
         console.log('Success');
       })
  });
