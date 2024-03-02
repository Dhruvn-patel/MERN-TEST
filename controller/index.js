const { prisma } = require("../config/db");
const { exportDataFromExcel, formatDate } = require("../helper");

const getEmployeeRecords = async (req, res) => {
  try {
    const data = await prisma.employee.findMany({});
    return res.status(200).send(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: 'Failed to get Record' });
  }
};

const addExcelEmployeeRecord = async (req, res) => {
  console.log('==>')
  if (req.file) {
    const { rows, filteredRows } = exportDataFromExcel(req.file);
    for (let i = 1; i < filteredRows.length; i++) {
      if (rows[i].length > 0) {
        const [id, name, joiningdate, birthdate, address] = rows[i];
        try {
          await prisma.employee.create({
            data: {
              name,
              joiningDate: formatDate(joiningdate),
              birthdate: formatDate(birthdate),
              address,
            },
          });
          res.status(200).json({ success: true, message: 'File added successfully' });
        } catch (error) {
          console.log("error", error);
          res.status(500).json({ success: false, message: "Failed to add Excel File" });
        }
      }
    }
 
  } else {
    //add simple record
    try {
      const data = req.body;
      await prisma.employee.create({
        data: data,
      });
      res
        .status(200)
        .json({ success: true, message: "Record added successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ success: false, message: "Failed to add record" });
    }
  }
};

const updateEmployeeRecord = async (req, res) => {
  const id = parseInt(req.params.id);
  const isExits = await prisma.employee.findUnique({ where: { id } });
  if (isExits) {
    const { name, joiningDate, birthdate, address } = req.body;
    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        name,
        joiningDate,
        birthdate,
        address,
      },
    });
    return res.status(200).json(employee);
  } else {
    return res.status(404).json({ error: "Record not found" });
  }
};

const deleteEmployeeRecord = async (req, res) => {
  const id = parseInt(req.params.id);
  const record = await prisma.employee.findUnique({ where: { id } });
  if (record) {
    await prisma.employee.delete({ where: { id } });
    return res.status(204).json({ msg: "Record deleted" });
  } else {
    return res.status(404).json({ msg: "Record not found" });
  }
};

module.exports = {
  getEmployeeRecords,
  addExcelEmployeeRecord,
  updateEmployeeRecord,
  deleteEmployeeRecord,
};
