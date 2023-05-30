const nodemailer = require("nodemailer");
const getemail = require('./render');
require("dotenv/config")
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD
    }
});
const run = {
    async send(){
        const emaillist = await getemail.list();
        console.log(emaillist)
        emaillist.forEach(element => {
            let mailoptions = {
                from: process.env.EMAIL_ID,
                to: element.emailid,
                subject: "Test email",
                text: `Test mail for ${element.cfid}`
            };
            // console.log(mailoptions.to);
            const sendmail = transporter.sendMail(mailoptions,function(error,info){
                if(error){
                    console.log(error);
                }
                else{
                    console.log("Email Sent" + info.response);
                }
            
            })
        });
    } 
}
run.send();






