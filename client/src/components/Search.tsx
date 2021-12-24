import React, { Fragment, useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { AuthContext } from "../store/auth-context";
import SearchTable from "./SearchTable/";
import { Patient } from "./PatientUpdates/NewPatient";
import { toastr } from "react-redux-toastr";

const Search: React.FC = Props => {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const getPatientsList = async () => {
    setPatientsList(await getPatients(authContext.uid?.toString()));
  };

  useEffect(() => {
    getPatientsList();
  }, []);

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
      </div>
    </Fragment>
  );
};

export default Search;

const getPatients = async (userId: string): Promise<Patient[]> => {
  try {
    let {
      data: { patients }
    } = await Axios.get("/api/patient/all/" + userId);
    return patients;
  } catch (error: any) {
    let message;
    if (error.response) {
      if (error.response.data.errors) {
        let errors = error.response.data.errors as string[];
        message = errors.join(". ");
      } else {
        message = error.response.data.message;
      }
    } else {
      message =
        error.message +
        ".\n Check internet connection is working for search function";
    }

    toastr.error("Error", message);
  }

  return [];
};
