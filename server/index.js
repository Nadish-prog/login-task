const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    user: "Nadish",
    host: "localhost",
    password: "Nadish",
    database: "login-system",
});
//Inserting data into the database
app.post('/register', (req, res) => {
    const username = req.body.username;
    const email=req.body.email;
    const password = req.body.password;
   db.query(
       "INSERT INTO users (username,email,password) VALUES(?,?,?)",[username,email,password],
       (err,result)=>{
             if(err){
                 console.log(err);
                res.send("Error while registering");}
             else {
                 console.log(result);
                    res.send("Values Inserted");

             }
       }
   )
});

app.post('/login',(req,res)=>{
       const email=req.body.email;
       const password=req.body.password;

       db.query(
           "SELECT * FROM users WHERE email = ? AND password=?",[email,password],
              (err,result)=>{
                if(err){
                     res.send({err:err});
                }
                if(result.length>0){
                     res.send(result);
                }else{
                     res.send({message:"Wrong email/password combination!"});
                }
              }
       )
});

app.get('/users', (req, res) => {
    db.query("SELECT username, email FROM users", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});

app.post('/updateScores', (req, res) => {
    const { id, maths, physics, chemistry, electronics, electrical, computer } = req.body;
    db.query(
        "UPDATE users SET maths = ?, physics = ?, chemistry = ?, electronics = ?, electrical = ?, computer = ? WHERE id = ?",
        [maths, physics, chemistry, electronics, electrical, computer, id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            } else {
                res.send("Scores Updated");
            }
        }
    );
});
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});
app. listen (3001, () => {
    console.log("running server");
});