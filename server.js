const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors");
const xlsx = require("xlsx");
const routes=require('./routes/index');
const { db_init } = require("./config/db");

// database connect
db_init();
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/records',routes)

// app.post("/upload", upload.single("file"), async(req, res) => {
  
// });




app.listen(PORT, () => {
  console.log(`server runing  ${PORT}`);
});
