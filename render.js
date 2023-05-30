const extractdata = require("./extract_data");
const database = extractdata.getdata();
const get = require('./cf-api');
const getemail = {
    async list(){
        let emaillist = [];
        const finallist = await get.response();
        // console.log(database);
        finallist.forEach(element => {
           let check = database.find(entry=>{return entry.cfid === element});
           if(check){emaillist.push(check)}
        });
        return emaillist;
    }
}
 getemail.list();

module.exports = getemail;


