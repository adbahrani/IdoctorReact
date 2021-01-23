import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import ".././App.css";

export interface HistoryProps {
  added: Function;
}

const History: React.FC<HistoryProps> = props => {
  const history = useHistory();

  let handleClick = () => {
    // props.added();
    // toastr.success("New Painent", "Added Successfuly");
  };

  return (
    <div>
      <h2 className=" main p-1">Patient Medical History</h2>
      <div className="row ">
        <div className="col-10">
          <div className="row justify-content-center">
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

              <div className="row  ">
                <div className="col-6 ">
                  <label
                    className="form-control  text-ali "
                    style={{ border: "none", textAlign: "left" }}
                  >
                    Pervious admission to the hospital
                  </label>
                </div>
                <div className="col-6">
                  <div className="form-check form-check-inline ">
                    <input
                      className="form-check-input  "
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Yes
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
                      No
                    </label>
                  </div>
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
                <button
                  type="button"
                  className="bttn-custom"
                  onClick={handleClick}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-2 ">
          <div className="card mr-2">
            <img className="card-img-top" src="..." alt="Patient Picture" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
