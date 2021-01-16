import React, { Fragment, useState, useContext } from "react";
import Navigation from "./common_components/navigation";

import { Spinner } from "react-bootstrap";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";

import options from "./options";
import AutoComplete from "./common_components/autoComplete";

import PatientContext from "./patientContext";

import "react-bootstrap-typeahead/css/Typeahead.css";
// import "./styles.css";

const Search: React.FC = Props => {
  const [fouce, setCount] = useState(false);
  const [newPatient, setNewPatient] = useState(false);
  const [searchedPatient, setSearchedPatient] = useState(null);

  let selectedPatient = (selected: any) => {
    console.log(selected);
    setSearchedPatient(selected);
  };

  return (
    <Fragment>
      <div className="container pt-2">
        {!newPatient ? (
          <Fragment>
            <button className="bttn-custom" onClick={() => setNewPatient(true)}>
              Add New Patient
            </button>
            <br />
            <br />
            <AutoComplete title={"Patient Name"} selected={selectedPatient} />
            <br />
            <AutoComplete title={"Patient DOB"} selected={selectedPatient} />
            <br />
            <AutoComplete
              title={"Patient Phone Number"}
              selected={selectedPatient}
            />
            <br />
            <button className="bttn-custom" disabled={searchedPatient == null}>
              Search
            </button>
          </Fragment>
        ) : (
          <Fragment>


            
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Search;
