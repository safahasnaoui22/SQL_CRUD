const express = require('express') 
const cors = require('cors')
const mysql = require('mysql')
const app = express()

app.use(express.json())
app.use(cors())

 const db = mysql.createConnection({
    host : "localhost" ,
    user : "root" ,
    password : "" ,
    database : "second"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json(data);
    });
});


app.post('/create' , (req , res) => {
    const sql = "INSERT INTO student (`Name` , `Email`) VALUES (?)"
    const values = 
      [  req.body.name, 
        req.body.email]
    
        db.query(sql , [values] , (err , data) => {
            if(err) return res.json("Error");
            return res.json(data)
        } )
} )



app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
    const values = [
        req.body.name, 
        req.body.email,
        req.params.id // Add the id parameter here
    ];

    db.query(sql, values, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ? ";
   const id = req.params.id
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});


app.listen(8081 , () =>{
    console.log('server runing on port 8081')
})