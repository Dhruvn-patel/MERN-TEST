
const xlsx = require("xlsx");
const exportDataFromExcel=(file)=>{
    const workbook = xlsx.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const headerRow = rows[0];
    const trimmedRows = rows.map((row) => row.slice(0, headerRow.length));
    const filteredRows = trimmedRows.filter(row => row.length > 0 && row.some(cell => cell !== undefined));
    return {filteredRows,rows}
}

const formatDate=(date)=>{
    const dateInMillis = Math.round((date - 25569) * 86400 * 1000);
    const dateObj = new Date(dateInMillis);
    return dateObj.toISOString()
  }

module.exports={exportDataFromExcel,formatDate}