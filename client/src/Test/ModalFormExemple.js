import ModalForm from "../Shared/Components/Modals/ModalForm";
import {useState} from "react";
import * as yup from 'yup';

const elements = [
    {
        label: "Business Name",
        type: "text",
        dblabel: "Business_Name",
        validate: yup.string().required()
    },
    {
        label: "Business Phone",
        type: "text",
        dblabel: "Business_phone",
    },
    {
        label: "Business Email",
        type: "text",
        dblabel: "Business_email",
    },
    {
        label: "ICE",
        type: "text",
        dblabel: "Business_ICE",
    },
    {
        label: "Address",
        type: "text",
        dblabel: "Business_Adress",
    },
]

const ModalFormExemple = ({action}) => {
    const [isOpen, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    }

    let readOnly = false;
    let values = {};

    if(action === "read") {
        readOnly = true;
    }

    if (action === "update" || action === "read") {
        values = {
            Business_Name: "FSmeida"
        }
    }

    const submitCallback = (data) => {
        console.log(data)
        switch (action) {
            case 'create':
                break;
            case 'update':
                break;
        }
    }

    return (
        <ModalForm
            show={isOpen}
            title="Show"
            elements={elements}
            values={values}
            submitCallback={submitCallback}
            handleClose={handleClose}
            readOnly={readOnly}
        />
    )
}

export default ModalFormExemple;