const healthModel = require("./healthModel")

// GET ALL RECORDS
exports.getRecords = (req,res)=>{
    const userId = req.user.id

    healthModel.getAllRecords(userId,(err,results)=>{
        if(err){
            return res.status(500).json(err)
        }

        res.json(results)
    })
}


// GET RECORD BY ID
exports.getRecordById = (req,res)=>{
    const id = req.params.id

    healthModel.getRecordById(id,(err,result)=>{
        if(err){
            return res.status(500).json(err)
        }

        if(result.length === 0){
            return res.status(404).json({
                message:"Record not found"
            })
        }

        res.json(result[0])
    })
}


// CREATE RECORD
exports.createRecord = (req,res)=>{

    const userId = req.user.id
    const {weight,height,date,blood_pressure,heart_rate} = req.body

    if(!weight || !height || !date){
        return res.status(400).json({
            message:"Missing required fields"
        })
    }

    if(weight <= 0 || height <= 0){
        return res.status(400).json({
            message:"Invalid weight or height"
        })
    }

    const bmi = weight / ((height/100)*(height/100))

    let category

    if(bmi < 18.5) category = "Underweight"
    else if(bmi < 25) category = "Normal"
    else if(bmi < 30) category = "Overweight"
    else category = "Obese"

    let advice

    if(category === "Underweight") advice = "You should gain weight"
    else if(category === "Normal") advice = "Your weight is healthy"
    else if(category === "Overweight") advice = "You should exercise more"
    else advice = "Consider consulting a doctor"

    const data = {
        user_id:userId,
        weight,
        height,
        blood_pressure,
        heart_rate,
        bmi:bmi.toFixed(2),
        date
    }

    healthModel.getRecordBydate(userId,date,(err,result)=>{

        if(err) return res.status(500).json(err)

        if(result.length > 0){

            healthModel.updateRecord(result[0].id,data,(err)=>{
                if(err) return res.status(500).json(err)

                return res.json({
                    message:"Record updated",
                    bmi:data.bmi,
                    category,
                    advice
                })
            })

        }else{

            healthModel.createRecord(data,(err)=>{
                if(err) return res.status(500).json(err)

                res.json({
                    message:"Record created",
                    bmi:data.bmi,
                    category,
                    advice
                })
            })

        }

    })

}


// UPDATE RECORD
exports.updateRecord = (req,res)=>{

    const id = req.params.id

    healthModel.updateRecord(id,req.body,(err)=>{
        if(err){
            return res.status(500).json(err)
        }

        res.json({
            message:"Record updated"
        })
    })
}


// DELETE RECORD
exports.deleteRecord = (req,res)=>{

    const id = req.params.id

    healthModel.deleteRecord(id,(err)=>{
        if(err){
            return res.status(500).json(err)
        }

        res.json({
            message:"Record deleted"
        })
    })

}
