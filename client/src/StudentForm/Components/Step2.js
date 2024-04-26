import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import { useRef, useState } from "react";

const Step2 = ({
  activeStep,
  handleBack,
  handleNext,
  docTypes,
  setFormData,
  formData,
}) => {
  // Create a ref object using useRef hook
  const radioRef = useRef(null);

  // State to keep track of the radio value
  const [value, setValue] = useState("");

  // Function to handle the radio change
  const handleRadioChange = (event) => {
    const selectedValue = event.currentTarget.value;
    setValue(selectedValue);
    setFormData({
      fields: {
        CIN: formData.fields.CIN,
        appogee: formData.fields.appogee,
        email: formData.fields.email,
      },
      docType: selectedValue, // Use the selected value directly instead of the state value
    });
  };

  const submit = () => {
    handleNext();
    setFormData({
      fields: {
        CIN: formData.fields.CIN,
        appogee: formData.fields.appogee,
        email: formData.fields.email,
      },
      docType: value,
    });
  };

  return (
    <>
      <Box className="px-3">
        {docTypes.map((doc) => (
          <div key={doc._id}>
            <input
              ref={radioRef}
              onChange={handleRadioChange}
              id={doc._id}
              value={doc._id}
              name="docType"
              type="radio"
            />
            <label htmlFor={doc._id} className="ms-3">
              {doc.title}
            </label>
          </div>
        ))}
      </Box>
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
                <Button onClick={submit} disabled={!!!value}>
                    Next
                </Button> */}
      </Box>
    </>
  );
};

export default Step2;
