"use strict";

var express = require('express');

var cors = require('cors');

var mysql = require('mysql');

var app = express();
app.use(express.json());
app.use(cors());
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "second"
});
db.connect(function (err) {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }

  console.log('Connected to MySQL database');
});
app.get("/", function (req, res) {
  var sql = "SELECT * FROM student";
  db.query(sql, function (err, data) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({
        error: "An error occurred"
      });
    }

    return res.json(data);
  });
});
app.post('/create', function (req, res) {
  var sql = "INSERT INTO student (`Name` , `Email`) VALUES (?)";
  var values = [req.body.name, req.body.email];
  db.query(sql, [values], function (err, data) {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
app.put('/update/:id', function (req, res) {
  var sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
  var values = [req.body.name, req.body.email, req.params.id // Add the id parameter here
  ];
  db.query(sql, values, function (err, data) {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
app["delete"]('/student/:id', function (req, res) {
  var sql = "DELETE FROM student WHERE ID = ? ";
  var id = req.params.id;
  db.query(sql, [id], function (err, data) {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
app.listen(8081, function () {
  console.log('server runing on port 8081');
});
//# sourceMappingURL=server.dev.js.map
