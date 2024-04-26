import { useState } from "react";
import Login from "../Components/Login";
import classes from "./Auth.module.css";
import Header from "../../StudentForm/Components/Header";
import Footer from "../../StudentForm/Components/Footer";

const Auth = () => {
  return (
    <>
      <Header />
      <div>
        <nav className={classes.nav}>
        </nav>
        <div className={classes.container}>
          <h2 className={`${classes.title} ${classes.textCenter}`}>
            Log into our system
          </h2>
          <Login />
          <p className={classes.textCenter}>
            Secure Login with reCAPTCHA subject to Google
            <br />
            <a href="/">Terms</a> & <a href="/">Privacy</a>
          </p>
        </div>
      </div>
      <nav className={classes.nav}>
        </nav>
      <Footer />
    </>
  );
};

export default Auth;
