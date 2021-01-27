import React, { Fragment, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AutoComplete from "./ui/autoComplete";
import options from "./options";
import "react-bootstrap-typeahead/css/Typeahead.css";
import NewPatient from "./newPatient";

const Search: React.FC = Props => {
  const [fouce, setCount] = useState(false);
  const [newPatient, setNewPatient] = useState(false);
  const [searchedPatient, setSearchedPatient] = useState(null);
  const history = useHistory();
  let selectedPatient = (selected: any) => {
    console.log(selected);
    setSearchedPatient(selected);
  };

  let newPatientAdded = () => {
    setNewPatient(false);
  };

  let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
    //   history.push("/main/history");
  };
  return (
    <Fragment>
      <button>
        <Link to="/main/history">Add a User</Link>
      </button>

      <div className="container pt-2">
        {!newPatient ? (
          <Fragment>
            <button className="bttn-custom" onClick={() => setNewPatient(true)}>
              Add New Patient
            </button>
            <br />
            <br />
            <AutoComplete
              title={"Patient Name"}
              options={options}
              selected={selectedPatient}
            />
            <br />
            <AutoComplete
              title={"Patient DOB"}
              options={options}
              selected={selectedPatient}
            />
            <br />
            <AutoComplete
              options={options}
              title={"Patient Phone Number"}
              selected={selectedPatient}
            />
            <br />
            <div className="row">
              <div className="offset-3 col-3">
                <button
                  className="bttn-custom "
                  disabled={searchedPatient == null}
                  onClick={handleClick}
                  name="newVisit"
                >
                  Add New Visit
                </button>
              </div>
              <div className="col-3">
                <button
                  className="bttn-custom"
                  disabled={searchedPatient == null}
                  onClick={e => handleClick(e)}
                  name="editHistory"
                >
                  Edit History
                </button>
              </div>
            </div>
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
