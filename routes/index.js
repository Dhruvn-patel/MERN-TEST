const express=require("express");
const multer = require("multer");
const { getEmployeeRecords, addEmployeeRecord, addExcelEmployeeRecord, updateEmployeeRecord, deleteEmployeeRecord } = require("../controller");

const upload = multer({ dest: "uploads/" });


const router = express.Router();
router.get('/',getEmployeeRecords)
router.post('/add',upload.single("file"), addExcelEmployeeRecord )
router.put('/update/:id',updateEmployeeRecord)
router.delete('/delete/:id',deleteEmployeeRecord)


module.exports = router;