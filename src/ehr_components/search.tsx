import React, { Fragment, useState, useContext } from "react";

import AutoComplete from "./common_components/autoComplete";

import "react-bootstrap-typeahead/css/Typeahead.css";
import NewPatient from "./newPatient";

// import "./styles.css";

const Search: React.FC = Props => {
  const [fouce, setCount] = useState(false);
  const [newPatient, setNewPatient] = useState(false);
  const [searchedPatient, setSearchedPatient] = useState(null);

  let selectedPatient = (selected: any) => {
    console.log(selected);
    setSearchedPatient(selected);
  };

  let newPatientAdded = () => {
    setNewPatient(false);
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
            <NewPatient added={newPatientAdded} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Search;
