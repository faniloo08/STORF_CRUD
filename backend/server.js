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


// app.use(session({
//     secret: "secretKey123", // change ça en prod
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false } // true si HTTPS
// }));

//Connexion
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM user WHERE username = ?", [username], async (err, data) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        if (data.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const match = await bcrypt.compare(password, data[0].password);

        if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

        req.session.user = {
            id: data[0].id,
            username: data[0].username
        };

        res.json({ message: "Connexion réussie", user: req.session.user });
    });
});

//Authentification
app.get("/auth", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});


//Deconnexion
app.post("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.json({ message: "Déconnexion réussie" });
});


//API
app.get("/", (req, res) =>{
    // const sql = "SELECT * FROM patient ORDER BY ID DESC LIMIT 5"
    const sql = "SELECT * FROM patient"
    db.query(sql, (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Create
app.post('/create',(req,res) => {
    const sql = 'INSERT INTO patient(Name, numDossier, diagnostic, prochainRdv, Medecin) VALUES (?)';
    const values = [
        req.body.name ,
        req.body.numDossier, 
        req.body.diagnostic, 
        req.body.prochainRdv,
        req.body.Medecin, 
    ]
    db.query(sql, [values], (err , data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Update
app.put('/update/:id', (req,res) => {
    const sql = 'update patient set Name = ?, numDossier = ?, diagnostic = ?,  prochainRdv = ?, Medecin = ? WHERE ID = ?';
    const values = [
        req.body.name,
        req.body.numDossier,
        req.body.diagnostic, 
        req.body.prochainRdv,
        req.body.medecin, 
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Delete
app.delete('/patient/:id', (req,res) => {
    const sql = 'DELETE FROM patient WHERE ID = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Search
app.get("/search", (req, res) =>{  
    const sql = 'SELECT * FROM patient Where Name LIKE ?'
    const patientName = req.query.name;
    db.query(sql, [`%${patientName}%`], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Total
app.get("/total_rows", (req, res) =>{
    const sql = "SELECT COUNT(*) AS total_rows FROM patient"
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