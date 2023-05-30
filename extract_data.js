require("dotenv/config")
const xlsx = require('xlsx');
let workbook = xlsx.readFile(`database/${process.env.EXCEL_FILE}`)
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
const extractdata = {
    getdata(){
        
        const database = [];
        for(i = parseInt(process.env.COLUMN_START); i<= parseInt(process.env.COLUMN_END); i++){
            let cfid = worksheet[`${process.env.CFID_COLUMN_1}${i}`].v;
            let emailid = worksheet[`${process.env.EMAILID_COLUMN_1}${i}`].v; 
            database.push({
                cfid: cfid, 
                emailid: emailid
            });
           
            
        }
        return database;
        // console.log(database);
        // console.log()
    }
}
extractdata.getdata();
module.exports = extractdata;