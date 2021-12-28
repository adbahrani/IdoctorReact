import express from "express";
import path from "path";
import mongoose from "mongoose";
import sslRedirect from "heroku-ssl-redirect";

import userRoutes from "./routes/user-routes";
import patientRoutes from "./routes/patient-routes";
import patientImageRoutes from "./routes/patient-image-routes";
import visitsRoutes from "./routes/visits-routes";
import reportsRoutes from "./routes/reports-routes";
import otherRoutes from "./routes/other-routes";

var cors = require("cors");

const app = express();
app.use(sslRedirect(["other", "development", "production"]));

app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/patient", patientImageRoutes);
app.use("/api/visits", visitsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/other", otherRoutes);

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "/uploads/images"))
);

const port = process.env.PORT || 5000;
let DB_LINK = process.env.DB_LINK || "mongodb://localhost/user";
if (process.env.LOCAL === "yes") {
  console.log("Set to localDB");
  DB_LINK = "mongodb://localhost/user";
}

// app.use((req, res, next) => {
//   if (req.headers.host === "idoctor-records.herokuapp.com")
//     return res.redirect(301, "https://idoctor-records.herokuapp.com");
//   else if (req.headers["x-forwarded-proto"] !== "https")
//     return res.redirect("https://" + req.headers.host + req.url);
//   else return next();
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("Server listening on port", port);
    });
  })
  .catch(err => {
    console.log(err);
  });
