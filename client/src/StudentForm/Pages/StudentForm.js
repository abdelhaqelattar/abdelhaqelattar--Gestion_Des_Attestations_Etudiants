import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Step1 from "../Components/Step1";
import Step2 from "../Components/Step2";
import Step3 from "../Components/Step3";
import { Container } from "react-bootstrap";
import { RouteContext } from "../../Shared/Context/RoutesContext";
import { useHttpClient } from "../../Shared/Hooks/HttpHook";
import Step4 from "../Components/Step4";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const steps = ["Formulaire"];

export default function HorizontalLinearStepper() {
  const { docTypes } = useContext(RouteContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [formData, setFormData] = useState({ fields: {} });
  const { sendRequest, clearError, error } = useHttpClient();

  const sendReq = async () => {
    clearError();
    console.log(formData);
    try {
      const responseData = await sendRequest(
        "http://127.0.0.1:5000/request",
        "POST",
        JSON.stringify(formData),
        {
          "Content-Type": "application/json",
        }
      );
      if (responseData) {
        console.log("responseData");
      }
      // if (responseData.student_id) {
      //   setFormData({
      //     ...formData,
      //     studentID: responseData.student_id,
      //   });
      //   handleNext();
      // }
    } catch (err) {}
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const selectedDoc = formData.docType
    ? docTypes.find((item) => item._id === formData.docType)
    : "";

  return (
    <>
      <Header />
      <Container className="my-5">
        <Box sx={{ width: "100%" }}>
          {/* <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper> */}
          {activeStep === steps.length ? (
            <Step4
              sendReq={sendReq}
              formData={formData}
              selectedDoc={selectedDoc}
              handleBack={handleBack}
              error={error}
            />
          ) : (
            <React.Fragment>
              <Step1
                formData={formData}
                setFormData={setFormData}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
              />
              {formData.fields && formData.fields.CIN && (
                <Step2
                  formData={formData}
                  setFormData={setFormData}
                  docTypes={docTypes}
                  activeStep={activeStep}
                  handleBack={handleBack}
                  handleNext={handleNext}
                />
              )}
              {formData.fields && formData.fields.CIN && selectedDoc && (
                <Step3
                  formData={formData}
                  setFormData={setFormData}
                  selectedDoc={selectedDoc}
                  activeStep={activeStep}
                  handleBack={handleBack}
                  handleNext={handleNext}
                />
              )}
              {/* { <Step2
              formData={formData}
              setFormData={setFormData}
              docTypes={docTypes}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
            /> } */}
              {/* <Step3
              formData={formData}
              setFormData={setFormData}
              selectedDoc={selectedDoc}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
            /> */}
            </React.Fragment>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
}
