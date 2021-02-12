import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import AutoComplete from "./ui/autoComplete";
//import options from "./options";
import "react-bootstrap-typeahead/css/Typeahead.css";
import NewPatient from "./newPatient";

const Search: React.FC = (Props) => {
  const [fouce, setCount] = useState(false);
  const [newPatient, setNewPatient] = useState(false);
  const [searchedPatient, setSearchedPatient] = useState(null);
  const [options, setOptions] = useState<any>();
  const history = useHistory();

  let handleTest = () => {
    console.clear();
    console.log("Click");

    fetch("https://idoctorpwa-default-rtdb.firebaseio.com/patients.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        label: "John",
        name: "John",
        number: 123456,
      }),
    })
      .then(function (res) {
        console.log("Sent data", res);
      })
      .catch(function (err) {
        console.log("Error while sending data", err);
      });
  };

  useEffect(() => {
    // Update the document title using the browser API
    let nameList: any[] = [];
    let numberList: any[] = [];
    let DOBList: any[] = [];
    fetch("https://idoctorpwa-default-rtdb.firebaseio.com/patients.json")
      .then((response) => response.json())
      .then((res) => {
        console.clear();
        for (var paient in res) {
          console.log(res[paient], paient);
          nameList.push({ label: res[paient].name });
          DOBList.push({ label: res[paient].number });
          numberList.push({ label: res[paient].dob });
        }
        updateOptions({ nameList, numberList, DOBList });
      });
    //  setOptions(list);
  }, []);

  let updateOptions = (lists: any) => {
    setOptions(lists);
    console.log(lists);
    //  console.log(optionst);
  };

  let selectedPatient = (selected: any) => {
    console.log(selected);
    setSearchedPatient(selected);
  };

  let newPatientAdded = () => {
    setNewPatient(false);
  };

  let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let button = e.target as HTMLInputElement;
    console.log(button.name);

    history.push(`/main/${button.name}`);
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
              options={options?.nameList}
              selected={selectedPatient}
            />
            <br />
            <AutoComplete
              title={"Patient DOB"}
              options={options?.nameList}
              selected={selectedPatient}
            />
            <br />
            <AutoComplete
              options={options?.nameList}
              title={"Patient Phone Number"}
              selected={selectedPatient}
            />
            <br />
            <div className="row">
              <div className="  col-6 col-sm-6 pr-4">
                <button
                  className="bttn-custom "
                  style={{ float: "right" }}
                  disabled={searchedPatient == null}
                  onClick={handleClick}
                  name="visit"
                >
                  New Visit
                </button>
              </div>
              <div className="col-6 col-sm-6 pl-4">
                <button
                  className="bttn-custom"
                  style={{ float: "left" }}
                  disabled={searchedPatient == null}
                  onClick={(e) => handleClick(e)}
                  name="history"
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
