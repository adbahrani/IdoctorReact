import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Axios from "axios";

import { Patient } from "../PatientUpdates/NewPatient";
import { Row, Col } from "react-bootstrap";

export default function Script() {
  const [RX, setRX] = useState("");

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

  if (patientState === undefined) {
    history.push("/main/search");
    return <></>;
  }

  return (
    <div className="container border  border-primary w-75 mt-4 ">
      <Row>
        <Col className="border border-primary">
          <p style={{ fontWeight: 600 }}>
            Dr. Maan Bahrani Consultant Pediatrician M.B.Ch.B JR HR HOSP .
            Oxford U. K DCH FICMS / Ped
          </p>
        </Col>
        <Col className="border border-primary">
          <p style={{ fontWeight: 600 }}>
            معن البحرانـي أستشاري أطفال دكتوراه في طــب ألاطفال دبلوم عالي في طب
            الأطفال اوكسفورد (أنكلترا) لامراض ألاطفال وحديثي الولادة والخدج
            الغدد الصماء والسكري
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col className="text-left">Name: {patientState.fullName}</Col>
      </Row>

      <Row>
        <Col>
          <p className="py-5">{RX}</p>
        </Col>
      </Row>

      <Row>
        <Col className="border border-primary p-2">
          <p>
            الحارثية – شارع الكندي – مقابل مطعم الفصول الأربعة – مجاور صيدلية
            العاج
          </p>
          رقم التسجيل (١٢٨٦٨) في ١٩/٨/١٩٨٥
        </Col>
      </Row>
    </div>
  );
}
