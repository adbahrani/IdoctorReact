import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";

import SearchTable from "./SearchTable/";
import { Patient } from "./NewPatient";

const Search: React.FC = (Props) => {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const history = useHistory();

  const getPatientsList = async () => {
    setPatientsList(await getPatients());
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

const getPatients = async (): Promise<Patient[]> => {
  let {
    data: { patients }
  } = await Axios.get("/api/patient/all");

  return patients;
};
