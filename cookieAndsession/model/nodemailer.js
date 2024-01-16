const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'prabhakarvaaneesh@gmail.com',
        pass:'lifa kyaq azmg pghw',
    }
});
transporter.verify((err,success)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Nodemailer is ready to send emails");
    }
})
module.exports=transporter;