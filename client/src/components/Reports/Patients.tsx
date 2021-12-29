import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../store/auth-context";
import BarChart from "./BarChart";

export default function Patients() {
  const [patientsList, setPatientsList] = useState();
  const title = "New Patients";
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(
      new Date(Date.now()).toISOString(),
      "FETCHING PATIENTS FOR REPORTS"
    );

    let getPatients = async () => {
      let {
        data: { newPatients }
      } = await Axios.get("/api/reports/patients/" + authContext.uid);

      console.log(
        new Date(Date.now()).toISOString(),
        "RETRIEVED NEW PATIENTS REPORT",
        newPatients
      );

      setPatientsList(newPatients);
    };

    getPatients();
  }, []);

  return <BarChart title={title} data={patientsList} />;
}
