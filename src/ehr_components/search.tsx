import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import AutoComplete from "./ui/autoComplete";
//import options from "./options";
import "react-bootstrap-typeahead/css/Typeahead.css";
import NewPatient from "./newPatient";

const Search: React.FC = Props => {
  const [fouce, setCount] = useState(false);
  const [newPatient, setNewPatient] = useState(false);
  const [searchedPatient, setSearchedPatient] = useState(null);
  const [options, setOptions] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    newPatientAdded();
    // Update the document title using the browser API
    let nameList: any[] = [];
    let numberList: any[] = [];
    let DOBList: any[] = [];
    fetch("https://idoctorpwa-default-rtdb.firebaseio.com/patients.json")
      .then(response => response.json())
      .then(res => {
        for (var id in res) {
          console.log(res[id], id);
          nameList.push({
            label: res[id].fullName
          });
          DOBList.push({ label: res[id].dob });
          numberList.push({ label: res[id].number });
        }
        updateOptions({ nameList, numberList, DOBList });
      });
  }, []);

  let updateOptions = (lists: any) => {
    setOptions(lists);
    console.log(lists.nameList);
    //  console.log(options);
  };

  let selectedPatient = (selected: any) => {
    console.log(selected);
    setSearchedPatient(selected);
  };

  let newPatientAdded = () => {
    console.log(window.location.hash);
    if (window.location.hash == "#success")
      toastr.success("New Painent", "Added Successfuly");
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
        <Fragment>
          <button
            className="bttn-custom"
            name="newPatient"
            onClick={handleClick}
          >
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
            options={options?.DOBList}
            selected={selectedPatient}
          />
          <br />
          <AutoComplete
            options={options?.numberList}
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
                onClick={e => handleClick(e)}
                name="history"
              >
                Edit History
              </button>
            </div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Search;
