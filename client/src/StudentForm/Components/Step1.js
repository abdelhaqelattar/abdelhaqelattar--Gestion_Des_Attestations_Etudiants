import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import FormElements from "../../Shared/Components/FormElements/FormElements";
import * as yup from "yup";
import { useHttpClient } from "../../Shared/Hooks/HttpHook";
import { useState } from "react";

const formElements = [
  {
    label: "Email",
    dblabel: "email",
    type: "text",
    placeholder: "Email Address",
    validate: yup.string().email("Invalid email").required(),
  },
  {
    label: "CIN",
    dblabel: "CIN",
    type: "text",
    placeholder: "L621093",
    validate: yup.string().required(),
  },
  {
    label: "Appogée",
    dblabel: "appogee",
    type: "text",
    placeholder: "20021106",
    validate: yup.string().required(),
  },
];

const Step1 = ({
  activeStep,
  handleBack,
  handleNext,
  formData,
  setFormData,
}) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [feedback, setFeedback] = useState("");

  const submit = async (data) => {
    clearError();
    // console.log("submit");
    // console.log(formData)
    setTimeout(() => {
      setFormData({
        docType: formData.docType,
        fields: {
          ...formData.fields,
          ...data,
        },
      });
    });
    // console.log(formData) ;
    // handleNext();
  };

  return (
    <>
      <Box className="py-5 px-3">
        {<p>{feedback}</p>}
        <FormElements
          elements={formElements}
          onSubmit={submit}
          submitOnChange={true}
        >
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {/* <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{mr: 1}}
                    >
                        Back
                    </Button>
                    <Box sx={{flex: '1 1 auto'}}/>
                    <Button type="submit">
                        Next
                    </Button> */}
          </Box>
        </FormElements>
      </Box>
    </>
  );
};

export default Step1;
