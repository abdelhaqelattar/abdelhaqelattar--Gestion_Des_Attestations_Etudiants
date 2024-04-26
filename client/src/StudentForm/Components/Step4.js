import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";

const Step4 = ({sendReq, formData, selectedDoc, handleBack, error}) => {
    const [sent, setSent] = useState(false)
    const send = () => {
        sendReq();
        setSent(true);
    }

    if (sent) {
        return (
            <Box className="pt-5 px-3">
                <h2 className="text-center mb-4">{selectedDoc.title}</h2>
                <Typography sx={{mt: 2, mb: 1}}>
                    {error && (
                        <>
                            <p> Error while sending request, please try again later</p>
                            <p className="text-danger">{error}</p>
                        </>
                    )}
                    {!error && <p className="text-success">Request Sent, Thanks for your visit!</p>}
            </Typography>
    </Box>
    )
    }

    return (
        <>
            <Box className="pt-5 px-3">
                <h2 className="text-center mb-4">{selectedDoc.title}</h2>
                <Typography sx={{mt: 2, mb: 1}}>
                    All steps completed - you&apos;re finished
                </Typography>

                {selectedDoc.formElements.map(ele => (
                    <p key={ele.dblabel}>
                        <strong style={{textTransform: 'capitalize'}}>{ele.label}: </strong>
                        <span>{formData.fields[ele.dblabel]}</span>
                    </p>
                ))}

                <Typography sx={{mt: 2, mb: 1}}>
                    If you re sure of information, Send the request
                </Typography>
                {/*{*/}
                {/*    Object.entries(formData.fields).map(([key, value]) => (*/}
                {/*        <Typography key={key}>*/}
                {/*            {value}*/}
                {/*        </Typography>*/}
                {/*    ))*/}
                {/*}*/}
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
                <Button
                    color="inherit"
                    onClick={handleBack}
                    sx={{mr: 1}}
                >
                    Back
                </Button>
                <Box sx={{flex: "1 1 auto"}}/>
                <Button onClick={send}>Send Request</Button>
            </Box>
        </>
    );
}

export default Step4