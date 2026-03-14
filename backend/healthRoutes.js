const express = require("express")
const router = express.Router()

const healthController = require("./healthController")
const auth = require("./middleware/auth")

router.get("/health-records", auth, healthController.getRecords)

router.get("/health-records/:id", auth, healthController.getRecordById)

router.post("/health-records", auth, healthController.createRecord)

router.put("/health-records/:id", auth, healthController.updateRecord)

router.delete("/health-records/:id", auth, healthController.deleteRecord)

module.exports = router
