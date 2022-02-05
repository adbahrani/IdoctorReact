const nodemailer = require("nodemailer");

// nodemailer.createTestAccount((err, account) => {
//   if (err) {
//       console.error('Failed to create a testing account. ' + err.message);
//       // return process.exit(1);
//   }

// create reusable transporter object using the default SMTP transport
let contactEmail: any = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",

  auth: {
    user: "idoctorsystem@gmail.com",
    pass: process.env.GMAIL_PASS
  }
});

contactEmail.verify((error: any) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send Mail");
  }
});

export default contactEmail;
