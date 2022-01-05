import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";

import { Modal, Button, Row, Col } from "react-bootstrap";

let CenteredModal = (props: any) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to IDoctor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Quick tips
          <span style={{ float: "right" }}> أساسيات الأستخدام</span>
        </h4>
        <Row>
          <Col>
            <p>
              {props.noPatient && "We see that you have 0 patient. "}To start
              you need to add new patient from the purple button "Add New
              Patient". After you do so you'll be asked if you want to add a
              visit. Once done, you can start searching for a patient in the
              search bar (by name, date, or phone number). A table below will
              appear to navigate to the patient's details
            </p>
          </Col>
          <Col>
            <p style={{ textAlign: "right" }}>
              للبدء ، يرجى إضافة المريض جديد من الزر الأرجواني بعد القيام بذلك
              سيتم سؤالك عما إذا كنت تريد إضافة زيارة. بمجرد القيام بذلك يمكنك
              بعدها بد البحث عن المريض في شريط البحث (بالاسم أو التاريخ أو رقم
              الهاتف) سيظهر الجدول أدناه للانتقال إلى تفاصيل المريض المدخل
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <span className="mr-auto">
          Feel free to contact for more help{" "}
          <a href="https://www.facebook.com/IDoctorSystem" target="_blank">
            https://www.facebook.com/IDoctorSystem
          </a>
        </span>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CenteredModal;

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
