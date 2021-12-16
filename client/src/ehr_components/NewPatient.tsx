import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";

import FieldRenderer from "./common_components/field-renderer";
import generateNewPatientFields from "./data/new-patient-fields";

import { AuthContext } from "../store/auth-context";

import Input from "./ui/Input";
import { Col, Row } from "react-bootstrap";

interface ObjectKeyAccess {
  [key: string]: string | any[] | PatientHistory | undefined;
}

export interface PatientHistory extends ObjectKeyAccess {
  patient: string;
  chronic_diseases: any[];
  previous_admission: string;
  previous_admission_description: string;
  past_surgery: string;
  past_surgery_description: string;
  fractures: string;
  family_history: string;
  drug_allergy: string;
  drug_allergy_description: string;
  chronic_drug_usage: string;
  chronic_drug_usage_description: string;
  blood_group: string;
  smoking_status: string;
  alcohol: string;
  notes: string;
}

export interface Patient extends ObjectKeyAccess {
  id?: string;
  fullName: string;
  dob: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  gender: string;
  job: string;
  maritalStatus: string;
  profileImage?: string;
  history?: PatientHistory;
  age: string;
}

const NewPatient: React.FC = () => {
  const { uid } = useContext(AuthContext);
  const history = useHistory();
  const [adding, setAdding] = useState(false);
  const [dobValues, setDobValues] = useState({
    day: "",
    month: "",
    year: ""
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<Patient>({
    fullName: "",
    dob: "",
    phoneNumber: "0000000000",
    address: "",
    zipCode: "",
    gender: "male",
    job: "",
    maritalStatus: "S",
    age: "",
    userId: uid
  });

  let ageFormatter = (dob: string) => {
    let currentYear = new Date().getFullYear();
    let age = currentYear - parseInt(dob);
    return age > 1 ? age.toString() : "";
  };

  let dobFormatter = (age: string) => {
    let currentYear = new Date().getFullYear();
    let ageYear = currentYear - parseInt(age);
    return ageYear ? ageYear.toString() : "";
  };

  let handleDateChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { value } = event.target;
    console.log(fieldName);
    setDobValues(prev => {
      let newState: any = { ...prev };
      newState[fieldName] = value;
      return newState;
    });
    if (fieldName === "year")
      setFormData(prev => {
        return { ...prev, age: ageFormatter(event.target.value) };
      });
  };

  useEffect(() => {
    let updatedDob = "";

    updatedDob += dobValues.day ? dobValues.day + "-" : "";
    updatedDob += dobValues.month ? dobValues.month + "-" : "";
    updatedDob += dobValues.year;

    setFormData(prev => {
      return { ...prev, dob: updatedDob };
    });
  }, [dobValues]);

  const updateFormData = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { value } = event.target;
    setFormData(prevState => {
      let newState = { ...prevState };
      if (fieldName === "age") {
        setDobValues(prev => {
          return { ...prev, year: dobFormatter(value) };
        });
        let updatedDob = `${dobValues.day}-${dobValues.month}-${dobValues.year}`;
        newState.dob = updatedDob;
      }
      newState[fieldName] = value;

      return newState;
    });
  };

  let fieldsMap = generateNewPatientFields({
    onChangeHandler: updateFormData,
    isFormSubmitted,
    formData
  });

  const formIsValid = fieldsMap.reduce(
    (
      previousValue: boolean,
      currentField: {
        name: string;
        validateValue?: (value: string) => boolean;
        value: string;
      }
    ) => {
      if (currentField?.name === "dob") console.log(currentField);
      if (currentField.validateValue) {
        return previousValue && currentField.validateValue(currentField.value);
      } else {
        return previousValue;
      }
    },
    true
  );

  let handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsFormSubmitted(true);
    if (formIsValid && dobValues.year) {
      setAdding(true);
      try {
        let patientData = {
          ...formData,
          phoneNumber: formData.phoneNumber.replace(/[^\d]/g, "")
        };
        let response = await Axios.post("/api/patient", patientData);
        console.log("CREATED PATIENT", response.data.patient);
        toastr.success("New Patient", "Added Successfully");
        history.push(`/main/search`);
      } catch (error: any) {
        setIsFormSubmitted(false);
        let message;
        if (error.response) {
          if (error.response.data.errors) {
            let errors = error.response.data.errors as string[];
            message = errors.join(". ");
          } else {
            message = error.response.data.message;
          }
        } else {
          message = error.message;
        }
        toastr.error("New Patient", message);
        setAdding(false);
      }
    } else {
      setAdding(false);
      let emptyFields = fieldsMap.filter(
        f => f.value.trim() === "" && f.validateValue
      );
      let required = emptyFields.map(f => f.label);
      console.log(required);
      toastr.warning("Please fill in all required fields", required.join(", "));
    }
  };

  return (
    <div className="container">
      <h2>New Patient</h2>
      <div className="row mt-4">
        <form
          className="col-12 col-md-10 col-lg-8 mx-auto"
          onSubmit={handleClick}
        >
          {fieldsMap.map((field: { name: string }) => {
            if (field.name === "dob") {
              return (
                <Row className="my-3">
                  <Col md={3}>
                    <label htmlFor={"day"} className="col-form-label text-left">
                      Date of Birth
                    </label>
                  </Col>
                  <Col md={{ span: 2, offset: 1 }} style={{ paddingLeft: 8 }}>
                    <Input
                      name="day"
                      placeholder="Day"
                      type="number"
                      value={dobValues.day}
                      onChange={handleDateChange}
                      min={0}
                      max={31}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </Col>
                  <Col md={3} style={{ paddingLeft: 8 }}>
                    <Input
                      name="month"
                      type="number"
                      min={0}
                      max={12}
                      placeholder="Month"
                      isFormSubmitted={isFormSubmitted}
                      value={dobValues.month}
                      onChange={handleDateChange}
                    />
                  </Col>
                  <Col style={{ paddingLeft: 8 }}>
                    <Input
                      name="year"
                      type="number"
                      errorMessage="Enter a valid year"
                      placeholder="Year"
                      isFormSubmitted={isFormSubmitted}
                      value={dobValues.year}
                      onChange={handleDateChange}
                      validateValue={(value: string) =>
                        parseInt(value) > 1900 &&
                        parseInt(value) < new Date().getFullYear()
                      }
                      min={1900}
                      max={new Date().getFullYear()}
                    />
                  </Col>
                </Row>
              );
            }
            return <FieldRenderer field={field} key={field.name} />;
          })}

          <div className="form-group">
            <button className="bttn-custom" disabled={adding}>
              {adding ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatient;
