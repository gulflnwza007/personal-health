const db = require("./db")

exports.getAllRecords = (userId,callback)=>{
    const sql = "SELECT * FROM health_records WHERE user_id=? ORDER BY date DESC"
    db.query(sql,[userId],callback)
}

exports.getRecordById = (id,callback)=>{
    const sql = "SELECT * FROM health_records WHERE id=?"
    db.query(sql,[id],callback)
}

exports.getRecordBydate = (userId,date,callback)=>{
    const sql = "SELECT * FROM health_records WHERE user_id=? AND date=?"
    db.query(sql,[userId,date],callback)
}

exports.createRecord = (data,callback)=>{

    const sql = `
    INSERT INTO health_records
    (user_id,weight,height,blood_pressure,heart_rate,bmi,date)
    VALUES (?,?,?,?,?,?,?)
    `

    db.query(sql,[
        data.user_id,
        data.weight,
        data.height,
        data.blood_pressure,
        data.heart_rate,
        data.bmi,
        data.date
    ],callback)
}

exports.updateRecord = (id,data,callback)=>{

    const sql = `
    UPDATE health_records
    SET weight=?,height=?,blood_pressure=?,heart_rate=?,bmi=?
    WHERE id=?
    `

    db.query(sql,[
        data.weight,
        data.height,
        data.blood_pressure,
        data.heart_rate,
        data.bmi,
        id
    ],callback)
}

exports.deleteRecord = (id,callback)=>{
    const sql = "DELETE FROM health_records WHERE id=?"
    db.query(sql,[id],callback)
}
