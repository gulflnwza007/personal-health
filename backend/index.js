const express = require("express")
const db = require("./db")
const bcrypt = require("bcrypt")

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("API Running")
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})

app.get("/users", (req,res)=>{
    db.query("SELECT * FROM users",(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.json(result)
        }
    })
})

app.post("/register",async (req,res)=>{
    const {username,firstname,lastname,email,password} = req.body

    const hash = await bcrypt.hash(password,10)

    db.query("INSERT INTO users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",
        [username,firstname,lastname,email,hash],
        (err,result)=>{
            if(err){
                res.send(err)
            }else{
                res.send("User created")
            }
        }

    )
})
