import { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Axios from "axios";

import { AuthContext } from "../../store/auth-context";

import { Patient } from "../PatientUpdates/NewPatient";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { toastr } from "react-redux-toastr";

export default function Script() {
  const [RX, setRX] = useState("");
  const [translate, setTranslate] = useState("");
  let currentUser = useContext(AuthContext);

  let history = useHistory();
  let { state: patientState } = useLocation<Patient>();
  let patientId = patientState && patientState.id ? patientState.id : "";

  let getVisits = async () => {
    let { data } = await Axios.get(`/api/visits/patient/${patientId}`);
    let lastVisit = data.visits.pop();
    console.log("Date", lastVisit);
    setRX(lastVisit.treatment);
  };
  useEffect(() => {
    if (patientId.length === 0) return;
    getVisits();
  }, [patientId]);

  useEffect(() => {
    console.log("RAPID_API_KEY", process.env.REACT_APP_RAPID_API_KEY);
    let options = {
      url: "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get",
      params: {
        langpair: "en|ar",
        q: currentUser.name
      },
      headers: {
        "x-rapidapi-host":
          "translated-mymemory---translation-memory.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setTranslate(response.data.responseData.translatedText);
      })
      .catch(function (error) {
        toastr.warning("Error with translation", error);
        console.error(error);
      });
  }, []);

  if (patientState === undefined) {
    history.push("/main/search");
    return <></>;
  }

  return (
    <div className="container border  border-primary w-75 mt-4 ">
      <Row>
        <Col className="border border-primary">
          <p style={{ fontWeight: 600 }}>{currentUser.name}</p>
        </Col>
        <Col className="border border-primary">
          <p style={{ fontWeight: 600 }}>{translate} </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col className="text-left">Name: {patientState.fullName}</Col>
        <Col className="text-right">Year of birth: {patientState.dob}</Col>
      </Row>

      <Row>
        <Col>
          <p className="py-5">{RX}</p>
        </Col>
      </Row>

      <Row>
        <Col className="border border-primary p-2">
          <p>{currentUser.username} </p>
          رقم التسجيل (١٢٨٦٨) في ١٩/٨/١٩٨٥
        </Col>
      </Row>
    </div>
  );
}
