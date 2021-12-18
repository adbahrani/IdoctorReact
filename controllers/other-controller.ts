import { RequestHandler } from "express";
import validationErrorHandler from "../utils/validation-error-handler";
import contactEmail from "../utils/mail";

const contactUs: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const { name, email, message } = req.body;

  const mail = {
    from: `${name} <${email}>`,
    to: "luciano.anderson45@ethereal.email",
    // cc: "ahmed_mail2005@yahoo.com",
    subject: "Contact Form Submission",
    text: "Hello to myself!",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`
  };

  contactEmail.sendMail(mail, (error: any) => {
    if (error) {
      res.json({ message: error });
    } else {
      res.json({ message: "Message Sent" });
    }
  });

  return null;
};

const otherController = {
  contactUs
};

export default otherController;
