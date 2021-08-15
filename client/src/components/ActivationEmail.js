import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import formStyles from "../css/forgotPass.module.css";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { activationEmail } from "../actions/auth";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const ActivationEmail = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const { activation_token } = useParams();
  console.log("activationEmail component ");

  useEffect(() => {
    console.log("activationEmail component", activation_token);

    if (activation_token) {
      console.log("activationEmail component", activation_token);
      // dispatch(activationEmail(activation_token));
    }
  }, [activation_token]);

  const handleClick = () => {
    console.log("hii");
  };

  return (
    <div className={formStyles.forgotPassPage}>
      <div className={formStyles.appNameDiv}>
        <p>
          <span>e</span>Crypt
        </p>
      </div>
      <br />

      <div className={formStyles.containerForm}>
        <Typography
          component="h1"
          variant="h5"
          className={formStyles.typography}
        ></Typography>
        <br />

        <div className={formStyles.formContainer} onClick={handleClick}>
          <Grid item>
            <Grid item>
            
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ActivationEmail;
