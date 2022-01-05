import React, { Fragment, useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { AuthContext } from "../store/auth-context";
import SearchTable from "./SearchTable/";
import { Patient } from "./PatientUpdates/NewPatient";
import { toastr } from "react-redux-toastr";
import CenteredModal from "./common_components/modal";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Search: React.FC = Props => {
  const [modalShow, setModalShow] = useState(false);
  const [patientsList, setPatientsList] = useState<Patient[]>(() => {
    let list = localStorage.getItem("patientsList");
    return list ? JSON.parse(list) : [];
  });
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const getPatientsList = async () => {
    let res = await getPatients(authContext.uid?.toString());
    if (res) setPatientsList(res);
    if (!res?.length && !patientsList.length) setModalShow(true);
    console.log("List", res);
  };

  useEffect(() => {
    getPatientsList();
  }, []);

  useEffect(() => {}, [patientsList]);

  let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let { name: btnName } = e.target as HTMLInputElement;

    history.push({
      pathname: `/main/${btnName}`
    });
  };

  return (
    <Fragment>
      <div className="container pt-2">
        <button
          className="bttn-custom mb-5"
          name="newPatient"
          onClick={handleClick}
        >
          Add New Patient
        </button>

        <SearchTable
          patientsList={patientsList}
          updateTable={getPatientsList}
        />
        <p>
          Press the icon for help
          <AiOutlineInfoCircle
            size={25}
            className="text-info mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => setModalShow(true)}
          />
        </p>

        <CenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          noPatient={patientsList.length === 0}
        />
      </div>
    </Fragment>
  );
};

export default Search;

const getPatients = async (userId: string): Promise<Patient[] | null> => {
  try {
    let {
      data: { patients }
    } = await Axios.get("/api/patient/all/" + userId);
    localStorage.setItem("patientsList", JSON.stringify(patients));
    if (patients.length > 80)
      toastr.info(
        "Trial Info",
        `you currently have ${
          100 - patients.length
        } patient left to add before, upgrade to allow more patient to be add`
      );
    return patients;
  } catch (error: any) {
    let message;

    if (error.response) {
      if (error.response.data.errors) {
        let errors = error.response.data.errors as string[];
        message = errors.join(". ");
      } else {
        message = error.response.data.message || error.response.statusText;
      }
    } else if (error) {
      console.log(error.message);
      message = error.message ? error.message : "";
    }
    message += ".\n working with offline data";
    toastr.warning("Internet error", message, { timeOut: 2500 });
  }

  return null;
};
