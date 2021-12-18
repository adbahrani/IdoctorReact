const nodemailer = require("nodemailer");

// import nodemailer from "nodemailer";

// nodemailer.createTestAccount((err, account) => {
//   if (err) {
//       console.error('Failed to create a testing account. ' + err.message);
//       // return process.exit(1);
//   }

// create reusable transporter object using the default SMTP transport
let contactEmail: any = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "luciano.anderson45@ethereal.email",
    pass: "a6VWgF9FJKuznsxVYu"
  }
});

contactEmail.verify((error: any) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

export default contactEmail;
