import React from "react";
import {Col, Container, Navbar, Row} from "react-bootstrap";

import RightNav from "./RightNav";
import classes from "./Navigation.module.css";
import {Menu} from "react-feather";

const Navigation = ({fullwidth, pageTitle, toggleMenu}) => {

    return (
        <Navbar className={`${classes.nav} ${fullwidth ? classes.fullwidth : ""}`}>
            <Container fluid>
                <Row>
                    <Col className={classes.toggleMenu}><Menu onClick={toggleMenu}/></Col>
                    <Col><h4 className="dashboard-page-title">{pageTitle}</h4></Col>
                </Row>
                <RightNav/>
            </Container>
        </Navbar>
    );
}

export default Navigation;