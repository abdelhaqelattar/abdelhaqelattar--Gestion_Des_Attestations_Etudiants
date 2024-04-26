import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import FormElements from "../../Shared/Components/FormElements/FormElements";
import * as yup from "yup";

const Step3 = ({
  activeStep,
  handleBack,
  handleNext,
  selectedDoc,
  formData,
  setFormData,
}) => {
  const submit = (data) => {
    // console.log(data)
    setFormData({
      docType: formData.docType,
      fields: {
        ...formData.fields,
        ...data
      },
    });
    console.log(formData);
    console.log(data);
    handleNext();
  };

  const formElements = selectedDoc.formElements.map((ele) => {
    return {
      label: ele.label,
      dblabel: ele.dblabel,
      type: ele.type,
      placeholder: ele.label,
      validate: yup.string().required(),
      options: ele.options,
    };
  });

  return (
    <>
      <Box className="pt-5 px-3">
        <FormElements elements={formElements} onSubmit={submit}>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {/* <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button> */}
            <Box sx={{ flex: "1 1 auto" }} />
            <Button type="submit">Submit</Button>
          </Box>
        </FormElements>
      </Box>
    </>
  );
};

export default React.memo(Step3);
