interface PersonalInfoParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: {
    username: string;
    email: string;
    name: string;
  };
}

export default function generatePersonalInfoFields(params: PersonalInfoParams) {
  let { onChangeHandler, formData } = params;
  console.log("formData", formData);
  let fieldsMap = [
    {
      label: "Address",
      name: "username",
      type: "Input",
      inputType: "text",
      placeholder: "Address",
      onChange: onChangeHandler,
      value: formData.username,
      isFormRow: false,
      showRequiredIcon: false
    },
    {
      label: "Doctor/Practice Name",
      name: "name",
      type: "Input",
      inputType: "text",
      placeholder: "Name",
      onChange: onChangeHandler,
      value: formData.name,
      isFormRow: false,
      showRequiredIcon: false
    },
    {
      label: "Email",
      name: "email",
      type: "Input",
      inputType: "text",
      placeholder: "Email",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        let emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(value);
      },
      value: formData.email,
      errorMessage: "Please enter a valid email",
      isFormRow: false,
      showRequiredIcon: false
    }
  ];

  return fieldsMap;
}
