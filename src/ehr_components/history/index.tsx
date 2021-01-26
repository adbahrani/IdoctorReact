import { toastr } from "react-redux-toastr";
import { useState } from "react";
import Field from "../ui/field";
import TextArea from "../ui/textarea";
import Radio from "../ui/radio";
import AutoComplete from "../common_components/autoComplete";
import { bloodGroups, diseases, yesOrNoOptions } from "./data";
import Button from "../ui/button";

export interface HistoryProps {
  added: Function;
}

const initialState: any = {
  fractures: '',
  previous_admission: 'no',
  past_surgery: 'no',
  drug_allergy: 'no',
  chronic_diseases: '',
  chronic_drug_usage: 'yes',
  smoking_status: 'no',
  alcohol: 'yes'
};

const History: React.FC<HistoryProps> = props => {
  
  let [medicalHistory, setMedicalHistory] = useState(initialState);

  let handleClick = () => {
    toastr.success("Patient Medical History", "Added Successfully");
    console.log(medicalHistory);
  };

  function handleFieldChange(fieldName: string, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    medicalHistory[fieldName] = event.target.value;
    setMedicalHistory({ ...medicalHistory });
  }

  function handleBloodGroupChange(options: Array<any>) {
    let value = options && options[0] ? options[0].value : '';
    medicalHistory.blood_group = value;
    setMedicalHistory({ ...medicalHistory });
  }

    function handleDiseaseChange(options: Array<any>) {
    medicalHistory.chronic_diseases = options;
    setMedicalHistory({ ...medicalHistory });
  }

  return (
    <div>
      <h2 className=" main p-1 mt-4 mb-5">Patient Medical History</h2>
      
      <form className="mx-auto" style={{ width: '60%' }}>
        
        <Field name="chronic_diseases" label="Chronic Diseases">
          <AutoComplete 
            title="Chronic Diseases"
            multiple={true}
            options={diseases} 
            selected={handleDiseaseChange} 
          />
        </Field>
        
        <Field name="previous_admission" label="Previous Admission to the hospital">
          <Radio
            name="previous_admission"
            options={yesOrNoOptions}
            value={medicalHistory.previous_admission} 
            onChange={handleFieldChange} 
          />
        </Field>

        <Field name="past_surgery" label="Past Surgery">
          <Radio
            name="past_surgery"
            options={yesOrNoOptions}
            value={medicalHistory.past_surgery} 
            onChange={handleFieldChange} 
          />
        </Field>
        
        <Field
          name="fractures" 
          label="Fractures" 
        >
          <TextArea
            name="fractures" 
            placeholder="Add details about any past fractures"
            value={medicalHistory.fractures} 
            onChange={handleFieldChange} 
          />
        </Field>

        <Field name="family_history" label="Family History">
          <TextArea
            name="family_history" 
            placeholder="Add details about the family history"
            value={medicalHistory.family_history} 
            onChange={handleFieldChange} 
          />
        </Field>

        <Field name="drug_allergy" label="Drug Allergy">
          <Radio
            name="drug_allergy"
            options={yesOrNoOptions}
            value={medicalHistory.drug_allergy} 
            onChange={handleFieldChange} 
          />
        </Field>

        <Field name="chronic_drug_usage" label="Chronic use of Drugs">
          <Radio
            name="chronic_drug_usage"
            options={yesOrNoOptions}
            value={medicalHistory.chronic_drug_usage} 
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
            value={medicalHistory.smoking_status} 
            onChange={handleFieldChange} 
          />
        </Field>

        <Field name="alcohol" label="Alcohol Drinking">
          <Radio
            name="alcohol"
            options={yesOrNoOptions}
            value={medicalHistory.alcohol} 
            onChange={handleFieldChange} 
          />
        </Field>

        <Field name="notes" label="Notes">
          <TextArea
            name="notes" 
            placeholder="add any additional notes"
            value={medicalHistory.notes} 
            onChange={handleFieldChange} 
          />
        </Field>

        <div className="form-group">
          <Button onClick={handleClick}>Add</Button>
        </div>
      </form>
      
        {/* <div className="col-2 ">
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
        </div> */}
    </div>
  );
};

export default History;
