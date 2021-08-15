import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { resetPassword } from "../actions/auth";
import TextField from "@material-ui/core/TextField";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { HiArrowNarrowRight } from "react-icons/hi";
import styles from "../css/resetPage.module.css";
import { CircleSpinner } from "react-spinners-kit";

const initialState = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState(initialState);
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const notification = useSelector((state) => state.notification);
  const [validationError, setValidationError] = useState("");
  const loadState = useSelector((state) => state.loading);
  const { place, isLoading } = loadState;
  const message = useSelector((state) => state.authResponseHandler);
  const { password, confirmPassword } = data;
  // const resetSuccess = notification.success;
  useEffect(() => {
    if (message.success && message.at === "resetPassword") {
      history.push("/login");
    }
  }, [message.success]);

  const { token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleRestPassword = () => {
    if (password !== confirmPassword) {
      setValidationError("Passwords does not match !");
      return;
    }
    if (password.length < 6) {
      setValidationError("Password must be at least 6 digits");
      return;
    } else {
      dispatch(resetPassword(token, password));
    }
  };

  console.log(token);

  return (
    <div className={styles.formComponent}>
      <form className={styles.formTag} onSubmit={handleRestPassword}>
        <div className={styles.headingWrapper}>
          <p className={styles.HeadingText}>Reset Password</p>
        </div>
        <div className={styles.messageWrapper}>
          {message.error && message.at === "resetPassword" ? (
            <div className={styles.errorDiv}>
              <p>{message.error}</p>
            </div>
          ) : (
            message.success &&
            message.at === "resetPassword" && (
              <div className={styles.successDiv}>
                <p>{message.success}</p>
              </div>
            )
          )}
        </div>

        <div className={styles.password1Wrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>PASSWORD</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              required
              placeholder="password"
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
            />
          </div>
        </div>
        <div className={styles.password2Wrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>CONFIRM PASSWORD</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              required
              placeholder="confirm password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              type="password"
            />
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button type="submit">
            {place === "resetPassword" && isLoading === true ? (
              <CircleSpinner size={10} color="white" loading={true} />
            ) : (
              <p>Reset now</p>
            )}
          </button>
        </div>
        <div className={styles.BottomLinkWrapper}>
          <p>
            <Link to="/user/auth/forgotPassword" className={styles.link}>
              Re-verify email? Click Here !
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;

// __________________________________________
// return (
//   <div className={formStyles.resetPage}>
//     <div className={formStyles.appNameDiv}>
//       <p>
//         <span>e</span>Crypt
//       </p>
//     </div>
//     <br />

//     <div className={formStyles.containerForm}>
//       <Typography
//         component="h1"
//         variant="h5"
//         className={formStyles.typography}
//       >
//         Enter your new password
//       </Typography>
//       <br />

//       <div className={formStyles.form}>
//         {notification.error || notification.success || validationError ? (
//           <div
//             className={
//               notification.error || validationError
//                 ? formStyles.notificationErrorDiv
//                 : formStyles.notificationSuccessDiv
//             }
//           >
//             {notification.error || validationError ? (
//               <p>
//                 {notification.error ? notification.error : validationError}
//               </p>
//             ) : (
//               <p>{notification.success}</p>
//             )}
//           </div>
//         ) : null}
//         <TextField
//           fullWidth
//           variant="outlined"
//           margin="normal"
//           required
//           label="Enter new password"
//           name="password"
//           type="password"
//           name="password"
//           id="password"
//           value={password}
//           onChange={handleChange}
//           size="small"
//           name="password"
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           variant="outlined"
//           margin="normal"
//           required
//           label="Confirm new password"
//           type="password"
//           name="confirmPassword"
//           id="confirmPassword"
//           value={confirmPassword}
//           onChange={handleChange}
//           autoFocus
//           onChange={handleChange}
//           size="small"
//         />

//         <button onClick={handleRestPassword} className={formStyles.submitBtn}>
//           {isLoading ? (
//             <CircleSpinner size={15} color="white" loading={true} />
//           ) : (
//             <HiArrowNarrowRight fontSize="20px" />
//           )}
//         </button>
//         <br />
//         <p>
//           <Link to="/forgotPassword">Re-verify email</Link>
//         </p>
//       </div>
//     </div>
//   </div>
// );
