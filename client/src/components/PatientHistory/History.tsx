import { useLocation, useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import React, { useState } from "react";
import Axios from "axios";

import Field from "../common_components/ui/Field";
import AutoComplete from "../common_components/ui/AutoComplete";
import { bloodGroups, diseases } from "./patient-history";
import { Patient, PatientHistory } from "../PatientUpdates/NewPatient";
import PatientImageUpload from "../PatientImageUpload";
import FieldRenderer from "../common_components/field-renderer";
import generatePatientHistoryFields from "./patient-history-fields";

interface ChronicDisease {
  label: string;
}

interface PatientHistoryRendered extends PatientHistory {
  chronic_diseases: ChronicDisease[];
}

const initialHistoryState: PatientHistoryRendered = {
  patient: "",
  chronic_diseases: [],
  previous_admission: "",
  previous_admission_description: "",
  past_surgery: "",
  past_surgery_description: "",
  fractures: "",
  family_history: "",
  drug_allergy: "",
  drug_allergy_description: "",
  chronic_drug_usage: "",
  chronic_drug_usage_description: "",
  blood_group: "",
  smoking_status: "",
  alcohol: "",
  notes: ""
};

const History: React.FC = () => {
  let history = useHistory();
  const [updating, setUpdating] = useState(false);
  let { state: patientState } = useLocation<Patient>();

  const [changedField, setChangedField] = useState("");
  let [medicalHistory, setMedicalHistory] = useState<PatientHistory>(() => {
    if (patientState === undefined) {
      return { ...initialHistoryState, patient: "" };
    }

    let chronicDiseases = patientState.history?.chronic_diseases as string[];

    let mappedChronicDiseases: ChronicDisease[] = [];
    if (chronicDiseases !== undefined) {
      mappedChronicDiseases = chronicDiseases.map((disease: string) => ({
        label: disease
      }));
    }

    return {
      ...initialHistoryState,
      ...patientState.history,
      chronic_diseases: mappedChronicDiseases,
      patient: patientState.id || ""
    };
  });

  function handleFieldChange(
    fieldName: string,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setChangedField(fieldName);

    let { value } = event.target;
    setMedicalHistory(prevState => {
      let newState = { ...prevState };
      newState[fieldName as keyof PatientHistory] = value;
      return newState;
    });
  }

  function handleBloodGroupChange(options: Array<any>) {
    let value = options && options[0] ? options[0].label : "";
    setMedicalHistory(prevState => {
      let newState = { ...prevState };
      newState.blood_group = value;
      return newState;
    });
  }

  function handleDiseaseChange(options: Array<any>) {
    let selected = options.map(option => ({ label: option.label }));
    setMedicalHistory(prevState => {
      let newState = { ...prevState };
      newState.chronic_diseases = selected;
      return newState;
    });
  }

  let fieldData = generatePatientHistoryFields({
    onChangeHandler: handleFieldChange,
    changedField,
    formData: medicalHistory
  });

  let handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdating(prev => !prev);
    try {
      let chronic_diseases = medicalHistory.chronic_diseases.map(
        disease => disease.label
      );
      let response = await Axios.patch("/api/patient/history", {
        ...medicalHistory,
        chronic_diseases
      });
      console.log("UPDATED HISTORY", response.data.patient);
      toastr.success("Patient History", "Updated Successfully");
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
      toastr.error("Patient History", message);
      setUpdating(prev => !prev);
    }
  };

  let fields = fieldData.map(field => {
    if (field.name === "chronic_diseases") {
      return (
        <Field
          name="chronic_diseases"
          label="Chronic Diseases"
          key={field.name}
          isFormRow={true}
        >
          <AutoComplete
            name="Chronic Diseases"
            placeholder="Chronic Diseases"
            multiple={true}
            options={diseases}
            defaultSelected={medicalHistory.chronic_diseases}
            onSelect={handleDiseaseChange}
          />
        </Field>
      );
    } else if (field.name === "blood_group") {
      let { blood_group } = medicalHistory;
      return (
        <Field
          name="blood_group"
          label="Blood Group"
          key={field.name}
          isFormRow={true}
        >
          <AutoComplete
            name="Blood Group"
            placeholder="Blood Group"
            options={bloodGroups}
            defaultSelected={blood_group ? [blood_group] : undefined}
            onSelect={handleBloodGroupChange}
          />
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
      <h2 className="main mb-4">Patient Medical History</h2>
      <div className="row">
        <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
          <PatientImageUpload />
        </div>
        <form className="col-md-8 col-lg-9" onSubmit={handleClick}>
          {fields}
          <div className="form-group">
            <button className="bttn-custom" disabled={updating}>
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default History;
