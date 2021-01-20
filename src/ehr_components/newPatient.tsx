import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";

export interface NewPatientProps {
  added: Function;
}

const NewPatient: React.FC<NewPatientProps> = props => {
  const history = useHistory();

  let handleClick = () => {
    props.added();
    toastr.success("New Painent", "Added Successfuly");
  };

  return (
    <div className="container">
      <h2>New Patient</h2>
      <br />
      <div className="row  justify-content-center">
        <form className="w-75   align-content-center">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="full_name_id"
              name="full_name"
              placeholder=" Full Name"
            />
          </div>
          <div className="form-group ">
            <div className="row">
              <div className="col-3">
                <input
                  type="text"
                  className="form-control"
                  id="street1_id"
                  name="street1"
                  placeholder="Age"
                />
              </div>

              <div className="col-4 ">
                <label
                  className="form-control text-right "
                  style={{ border: "none" }}
                >
                  Date of Birth
                </label>
              </div>
              <div className="col-5 ">
                <input
                  type="date"
                  className="form-control"
                  id="DOB"
                  name="street1"
                  placeholder="Br"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="street1_id"
              name="street1"
              placeholder="Address"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="street1_id"
              name="street1"
              placeholder="Job"
            />
          </div>

          <div className="  float-left pl-1 pb-2">
            <div className="form-check form-check-inline ">
              <input
                className="form-check-input p-5"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Intersex
              </label>
            </div>
          </div>

          <div className="form-group">
            <select className="form-control" id="state_id">
              <option value="" selected disabled hidden>
                Marital Status
              </option>
              <option value="S">Single</option>
              <option value="M">Married</option>
              <option value="D">Divorced</option>
              <option value="W">Windower</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="zip_id"
              name="zip"
              placeholder="Phone Number"
            />
          </div>

          <div className="form-group">
            <button type="button" className="bttn-custom" onClick={handleClick}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatient;
