const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("./db")
const authMiddleware = require("./middleware/auth")
const healthRoutes = require("./healthRoutes")

const app = express()

app.use(express.json())

app.use("/",healthRoutes)

const SECRET = "mysecretkey"

app.get("/",(req,res)=>{
    res.send("API Running")
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})

app.post("/register", async (req,res)=>{
    const {username,email,password,firstname,lastname}= req.body

    if(!username || !email || !password || !firstname || !lastname){
        return res.status =(400).json({
            message:"ALl fields required"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const sql = `INSERT INTO users (username,email,password,firstname,lastname,role) VALUES (?,?,?,?,?,?)`

    db.query(sql,[username,email,hashedPassword,firstname,lastname,"user"],(err,result)=>{
        if(err){
            return res.status(500).json(err)
        }

        res.json({
            message:"User created"
        })
    })
})
app.post("/login",(req,res)=>{

    const {email,password} = req.body

    const sql = "SELECT * FROM users WHERE email = ?"

    db.query(sql,[email],async (err,result)=>{

        if(err) return res.status(500).json(err)

        if(result.length === 0){
            return res.status(401).json({
                message:"Email not found"
            })
        }

        const user = result[0]

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({
                message:"Password incorrect"
            })
        }

        const token = jwt.sign(
            {
                id:user.id,
                email:user.email,
                role:user.role
            },
            SECRET,
            {expiresIn:"1h"}
        )

        res.json({
            message:"Login success",
            token:token
        })

    })
})
