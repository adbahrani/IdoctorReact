import { toastr } from "react-redux-toastr";
import { useState } from "react";
import Field from "./ui/field";
import TextArea from "./ui/textarea";
import Radio from "./ui/radio";
import AutoComplete from "./ui/autoComplete";
import { bloodGroups, diseases, yesOrNoOptions } from "./data/patient-history";
import Button from "./ui/button";

export interface VisitProps {
  added: Function;
}

const initialState: any = {
  fractures: "",
  previous_admission: "no",
  past_surgery: "no",
  drug_allergy: "no",
  chronic_diseases: "",
  chronic_drug_usage: "yes",
  smoking_status: "no",
  alcohol: "yes"
};

const Visit: React.FC<VisitProps> = props => {
  let [medicalVisit, setMedicalVisit] = useState(initialState);

  let handleClick = () => {
    toastr.success("Patient Medical Visit", "Added Successfully");
    console.log(medicalVisit);
  };

  function handleFieldChange(
    fieldName: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    medicalVisit[fieldName] = event.target.value;
    setMedicalVisit({ ...medicalVisit });
  }

  function handleBloodGroupChange(options: Array<any>) {
    let value = options && options[0] ? options[0].value : "";
    medicalVisit.blood_group = value;
    setMedicalVisit({ ...medicalVisit });
  }

  function handleDiseaseChange(options: Array<any>) {
    medicalVisit.chronic_diseases = options;
    setMedicalVisit({ ...medicalVisit });
  }

  return (
    <div>
      <h2 className=" main p-1 mt-4 mb-5">Visit</h2>

      <div className="mx-auto" style={{ width: "90%" }}>
        <div className="row">
          <form className="col-9">
            <Field name="chronic_diseases" label="Chronic Diseases">
              <AutoComplete
                title="Chronic Diseases"
                multiple={true}
                options={diseases}
                selected={handleDiseaseChange}
              />
            </Field>

            <Field
              name="previous_admission"
              label="Previous Admission to the hospital"
            >
              <Radio
                name="previous_admission"
                options={yesOrNoOptions}
                value={medicalVisit.previous_admission}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="past_surgery" label="Past Surgery">
              <Radio
                name="past_surgery"
                options={yesOrNoOptions}
                value={medicalVisit.past_surgery}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="fractures" label="Fractures">
              <TextArea
                name="fractures"
                placeholder="Add details about any past fractures"
                value={medicalVisit.fractures}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="family_Visit" label="Family Visit">
              <TextArea
                name="family_Visit"
                placeholder="Add details about the family Visit"
                value={medicalVisit.family_Visit}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="drug_allergy" label="Drug Allergy">
              <Radio
                name="drug_allergy"
                options={yesOrNoOptions}
                value={medicalVisit.drug_allergy}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="chronic_drug_usage" label="Chronic use of Drugs">
              <Radio
                name="chronic_drug_usage"
                options={yesOrNoOptions}
                value={medicalVisit.chronic_drug_usage}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="blood_group" label="Blood Group">
              <AutoComplete
                title="Blood Group"
                options={bloodGroups}
                selected={handleBloodGroupChange}
              />
            </Field>

            <Field name="smoking_status" label="Smoking Status">
              <Radio
                name="smoking_status"
                options={yesOrNoOptions}
                value={medicalVisit.smoking_status}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="alcohol" label="Alcohol Drinking">
              <Radio
                name="alcohol"
                options={yesOrNoOptions}
                value={medicalVisit.alcohol}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="notes" label="Notes">
              <TextArea
                name="notes"
                placeholder="add any additional notes"
                value={medicalVisit.notes}
                onChange={handleFieldChange}
              />
            </Field>

            <div className="form-group">
              <Button onClick={handleClick}>Add</Button>
            </div>
          </form>

          <div className="offset-1 col-2">
            <div className="card mr-2">
              <img
                className="card-img-top"
                src="./img/team/02.jpg"
                alt="Patient"
              />
              <div className="card-body">
                <h5 className="card-title">Joey</h5>
                <a href="#" className="btn btn-primary">
                  Update Image
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visit;
