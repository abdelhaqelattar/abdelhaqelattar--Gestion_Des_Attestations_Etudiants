import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import Logo from "../Components/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header class="header">
        <div class="logo">
          <img src={Logo} alt="" />
        </div>
      </header>
      <div class="under_header">
        <nav class="navigation">
          <a href="#">Accueil</a>
          <a href="#">ENSATE</a>
          <a href="#">Formation</a>
          <a href="#">Rech. Scientifique</a>
          <a href="#">Esp. Etudiant</a>
          <a href="#">Vie Estudiantine</a>
          <a href="#">Actualités</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </>
  );
};

export default Header;
