import React from "react";
import ImageUpload from "./ImageUpload";
import {Form} from "react-bootstrap";

const FormElement = (props) => {
    const handleChange = (value) => {
        if (props.onChange) {
            props.onChange(value);
        }
    };

    if (props.type === "image") {
        return (
            <ImageUpload
                id={props.id}
                defaultValue={props.value}
                onInput={handleChange} // Assuming ImageUpload can handle an onChange prop
            />
        );
    } else if (props.type === "select") {
        const { value, ...restProps } = props;
        return (
            <Form.Select
                {...restProps}
                defaultValue=""
            >
                <option value="" disabled>{props.placeholder}</option>
                {props.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </Form.Select>
        );
    }

    if(props.type === "textarea") {
        return (
            <Form.Control
                as={props.type}
                style={{ minHeight: props.type === "textarea" ? '100px' : 'auto'}}
                {...props} // Spread all props to Form.Control
            />
        );
    }

    return (
        <Form.Control
            {...props} // Spread all props to Form.Control
        />
    );
};

export default FormElement;
