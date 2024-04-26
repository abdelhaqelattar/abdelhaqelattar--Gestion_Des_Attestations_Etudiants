import {Button, Modal} from "react-bootstrap";

import FormElements from "../FormElements/FormElements";
import classes from "./ModalForm.module.css";
import {CheckCircle} from "react-feather";
import React, {useCallback} from "react";

const ModalForm = ({title, formElements, values, isOpen, setOpen, submitHandler, readOnly = false}) => {
    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return (
        <Modal
            show={isOpen}
            scrollable={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title className={classes.title} id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={classes.ModalBody}>
                <FormElements elements={formElements} values={values} readOnly={readOnly} onSubmit={submitHandler}>
                    <Modal.Footer>
                        <Button className={classes.submit_button} type="submit"><CheckCircle/> Save</Button>
                    </Modal.Footer>
                </FormElements>
            </Modal.Body>
        </Modal>
    );
}

export default React.memo(ModalForm);