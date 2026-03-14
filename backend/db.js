const mysql = require("mysql2")
const db = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user:"root",
    password:"root",
    database:"health_db"
})
db.connect((err)=>{
    if(err){
        console.log("Database error:",err)
    } else{
        console.log("Database connected")
    }
})
module.exports = db