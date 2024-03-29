import { toastr } from "react-redux-toastr";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Axios from "axios";

import FieldRenderer from "../common_components/field-renderer";
import Field from "../common_components/ui/Field";
import Input from "../common_components/ui/Input";
import PatientImageUpload from "../PatientImageUpload";
import { Patient } from "../PatientUpdates/NewPatient";
import generateNewVisitFields, { PatientVisit } from "./new-visit-fields";
import axios from "axios";

export interface VisitProps {
  added: Function;
}

const initialVisitState: PatientVisit = {
  id: "",
  patient: "",
  date: "",
  complaint: "",
  present_illness_history: "",
  other_system_review: "",
  other_system_review_description: "",
  bp_dia: "",
  bp_sys: "",
  pulse_rate: "",
  temperature: "",
  respiratory_rate: "",
  spo2: "",
  weight: "",
  height: "",
  bmi: "",
  lab_investigation: "",
  lab_investigation_description: "",
  diagnosis: "",
  treatment: "",
  is_free: "",
  is_review: "",
  is_referred: "",
  cost: "",
  notes: ""
};

const NewVisit: React.FC<VisitProps> = () => {
  let history = useHistory();
  const [changedField, setChangedField] = useState("");
  let { state: patientState } = useLocation<Patient>();

  let [medicalVisit, setMedicalVisit] = useState<any>({
    ...initialVisitState,
    patient: patientState?.id || ""
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  let prePopulateVisit = async () => {
    let lastVisitId = patientState?.visits?.pop();
    console.log(patientState);
    if (lastVisitId) {
      let { data } = await axios.get("api/visits/" + lastVisitId);
      console.log("Visit", data.visit, medicalVisit);
      setMedicalVisit(data.visit);
    }
  };

  let handleFieldChange = useCallback(
    (
      fieldName: string,
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setChangedField(fieldName);
      let { value } = event.target;
      setMedicalVisit((prevState: any) => {
        let newState = { ...prevState };
        newState[fieldName as keyof PatientVisit] = value;
        return newState;
      });
    },
    []
  );

  let fieldData = generateNewVisitFields({
    onChangeHandler: handleFieldChange,
    isFormSubmitted,
    changedField,
    formData: medicalVisit
  });

  const invalidFields = fieldData.flatMap(
    (currentField: {
      validateValue?: (value: string) => boolean;
      value?: string;
      label?: string;
    }) => {
      const { validateValue, value } = currentField;
      if (
        validateValue !== undefined &&
        value !== undefined &&
        !validateValue(value)
      ) {
        return [currentField];
      } else {
        return [];
      }
    }
  );

  let handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (invalidFields.length === 0) {
      setIsFormSubmitted(true);
      try {
        let response = await Axios.post("/api/visits", medicalVisit);
        console.log("CREATED VISIT", response.data.visit);
        toastr.success("Patient Visit", "Added Successfully");
        history.push("/main/search");
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
          message = error.message;
        }
        toastr.error("New Patient", message);
        setIsFormSubmitted(false);
      }
    } else {
      let namesOfInvalidFields = invalidFields.map(field => {
        return field.label;
      });
      let message = namesOfInvalidFields.join(", ");
      toastr.error("Invalid Inputs", `Please fix the following: ${message}`);
    }
  };

  let fields = fieldData.map(field => {
    let { name } = field;

    // special handling for blood pressure as it has two different inputs
    if (name === "blood_pressure") {
      return (
        <Field name="bp_sys" label="Blood Pressure" isFormRow={true} key={name}>
          <>
            <Input
              name="bp_sys"
              placeholder="Enter SYS value here"
              value={medicalVisit.bp_sys}
              append="MMHG"
              onChange={handleFieldChange}
            />
            <div className="mt-2">
              <Input
                name="bp_dia"
                placeholder="Enter DIA value here"
                value={medicalVisit.bp_dia}
                append="MMHG"
                onChange={handleFieldChange}
              />
            </div>
          </>
        </Field>
      );
    } else {
      return <FieldRenderer field={field} key={field.name} />;
    }
  });

  if (patientState === undefined) {
    history.push("/main/search");
    return <></>;
  }

  return (
    <div className="container">
      <h2 className="main mb-4">Visit</h2>
      <p
        className=" text-secondary  mb-3 btn"
        onClick={prePopulateVisit}
        hidden={!patientState.visits?.length}
      >
        <u>Click here to get data from last visit*</u>
      </p>

      <div className="row">
        <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
          <PatientImageUpload />
        </div>
        <form className="col-md-8 col-lg-9" onSubmit={handleClick}>
          {fields}
          <div className="form-group">
            <button className="bttn-custom" disabled={isFormSubmitted}>
              {isFormSubmitted
                ? "Adding Visit Details..."
                : "Add Visit Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewVisit;
