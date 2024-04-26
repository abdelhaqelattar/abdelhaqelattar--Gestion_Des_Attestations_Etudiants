import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import * as React from "react";

const Footer = () => {
  return (
    <>
      <footer class="text-white text-center text-lg-start bg-primary">
        <div class="container p-4">
          <div class="row mt-4">
            <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4">About ENSA</h5>

              <p>
              Créée en Septembre 2008, l’École Nationale des Sciences Appliquées de Tétouan membre du réseau des Ecoles Nationales des Sciences Appliquées, est un établissement public à caractère scientifique culturel et professionnel, instauré pour être une école d’ingénieurs de haut niveau…
              </p>

              

              <div class="mt-4">
                <a type="button" class="btn btn-floating btn-primary btn-lg">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a type="button" class="btn btn-floating btn-primary btn-lg">
                  <i class="fab fa-dribbble"></i>
                </a>
                <a type="button" class="btn btn-floating btn-primary btn-lg">
                  <i class="fab fa-twitter"></i>
                </a>
                <a type="button" class="btn btn-floating btn-primary btn-lg">
                  <i class="fab fa-google-plus-g"></i>
                </a>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4 pb-1">Search something</h5>

              <div class="form-outline form-white mb-4">
                <input
                  type="text"
                  id="formControlLg"
                  class="form-control form-control-lg"
                />
                <label class="form-label" for="formControlLg">
                  Search
                </label>
              </div>

              <ul class="fa-ul" style={{ marginLeft: "1.65em" }}>
                <li class="mb-3">
                  <span class="fa-li">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="ms-2">
                    Avenue de la Palestine Mhanech I, TÉTOUAN
                  </span>
                </li>
                <li class="mb-3">
                  <span class="fa-li">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="ms-2">ensate@uae.ac.ma</span>
                </li>
                <li class="mb-3">
                  <span class="fa-li">
                    <i class="fas fa-phone"></i>
                  </span>
                  <span class="ms-2">05396-88027
</span>
                </li>

              </ul>
            </div>

            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4">Opening hours</h5>

              <table class="table text-center text-white">
                <tbody class="font-weight-normal">
                  <tr>
                    <td>Mon - Fri:</td>
                    <td>8am - 3pm</td>
                  </tr>
                  <tr>
                    <td> Sat:</td>
                    <td>9am - 12am</td>
                  </tr>
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
