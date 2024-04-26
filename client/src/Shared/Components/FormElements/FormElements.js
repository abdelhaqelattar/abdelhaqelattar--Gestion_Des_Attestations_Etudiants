import {Col, Form, Row} from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';

import classes from "./FormElements.module.css";
import FormElement from "./FormElement";

const FormElements = ({elements, values, dashed, readOnly, children, onSubmit, submitOnChange}) => {
    const {Formik} = formik;

    const shemaValues = {};
    elements.forEach(element => {
        if (element.validate) {
            shemaValues[element.dblabel] = element.validate;
        }
    });

    const schema = yup.object().shape(shemaValues);

    if(!values) {
        values = {};
        elements.map(ele => values[ele.dblabel] = "");
    }

    return (
        <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={values}
        >
            {({handleSubmit, handleChange, values, touched, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {elements &&
                        elements.map((formItem, formIndex) => (
                            <div className={`${classes.formGroup} ${dashed ? classes.dashed : ''}`} key={formIndex}>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label column sm="3">
                                        {formItem.label}
                                    </Form.Label>
                                    <Col sm="9">
                                        <FormElement
                                            placeholder={formItem.placeholder}
                                            type={formItem.type}
                                            className={classes.formControl}
                                            name={formItem.dblabel}
                                            value={values[formItem.dblabel]}
                                            options={formItem.options}
                                            onChange={(e) => {
                                                handleChange(e);
                                                if (submitOnChange) {   
                                                    handleSubmit(e);
                                                }
                                            }}
                                            isInvalid={errors[formItem.dblabel]}
                                            readOnly={readOnly}
                                        />
                                        <Form.Control.Feedback type="invalid">Looks not good!</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </div>
                        ))}
                    {children}
                </Form>
            )}
        </Formik>)
}

export default FormElements