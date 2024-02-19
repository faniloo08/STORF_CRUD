const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express() ;
app.use(express.json());
app.use(cors()); 

//connection to mysql 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
}) 

//API
app.get("/", (req, res) =>{
    const sql = "SELECT * FROM student ORDER BY ID DESC LIMIT 5"
    db.query(sql, (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Create
app.post('/create',(req,res) => {
    const sql = 'INSERT INTO student(Name, email) VALUES (?)';
    const values = [
        req.body.name ,
        req.body.email
    ]
    db.query(sql, [values], (err , data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Update
app.put('/update/:id', (req,res) => {
    const sql = 'update student set Name = ?, email = ? WHERE ID = ?';
    const values = [
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Delete
app.delete('/student/:id', (req,res) => {
    const sql = 'DELETE FROM student WHERE ID = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Search
app.get("/search", (req, res) =>{  
    const sql = 'SELECT * FROM student Where Name LIKE ?'
    const studentName = req.query.name;
    db.query(sql, [`%${studentName}%`], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Total
app.get("/total_rows", (req, res) =>{
    const sql = "SELECT COUNT(*) AS total_rows FROM student"
    db.query(sql, (err, data) =>{
        if(err) return res.json("Error");
        const totalRows = data[0].total_rows;
        return res.json({total_rows: totalRows});
    })
})

//port
app.listen(8081, () => {
    console.log("listening"); 
})