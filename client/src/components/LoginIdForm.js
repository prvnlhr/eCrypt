import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, MenuItem } from "@material-ui/core";
import { CircleSpinner } from "react-spinners-kit";
import { motion } from "framer-motion";

import { HiX, HiCheck, HiArrowNarrowRight } from "react-icons/hi";

import {
  addNewLoginId,
  editLoginId,
  clearProcess,
} from "../actions/loginInIdsAction";
import formStyles from "../css/loginIdForm.module.css";
import btnStyles from "../css/buttons.module.css";
import styles from "../css/loginIdFormNew.module.css";

const variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    // opacity: 0,
    scale: 0,
  },
};
const LoginIdForm = ({ currentId, setCurrentId, formMode, setFormMode }) => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    website: "",
    username: "",
    password: "",
  });

  const userId = useSelector((state) => state.user.user._id);
  const process = useSelector((state) => state.process);
  const [btnText, setBtnText] = useState("Add LoginId");

  const websiteInputRef = useRef();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  // const [inProcess, setInProcess] = useState(false);

  const loginIdDataToEdit = useSelector((state) =>
    currentId ? state.logins.loginIds.find((l) => l._id === currentId) : null
  );

  useEffect(() => {
    if (loginIdDataToEdit) setLoginData(loginIdDataToEdit);
  }, [loginIdDataToEdit]);

  //___This useEffect keeps track of process state after dispatching
  useEffect(() => {
    if (process.category === "loginId") {
      if (process.status === "success") {
        successHandler();
      } else if (process.status === "failed") {
        failureHandler();
      }
    }
  }, [process]);

  const formValidator = () => {
    if (loginData.website.length === 0) {
      websiteInputRef.current.focus();
    } else if (loginData.username.length === 0) {
      userNameInputRef.current.focus();
    } else if (loginData.password.length === 0) {
      passwordInputRef.current.focus();
    } else {
      dispatch(addNewLoginId(loginData, userId));
    }
  };

  const confirmSave = () => {
    console.log(loginData);
    formValidator();

    // if (currentId) {
    //   dispatch(editLoginId(currentId, loginData));
    // } else {
    //   dispatch(addNewLoginId(loginData, userId));
    // }
    // clear();
    // setFormMode(!formMode);
    // inProcessing();
  };
  //__Functions form success or failure of form adding
  const successHandler = () => {
    // if success ==> clear form ,toggle formMode == false ,setBtnText back to 'Add card' ,
    // and dispatch action to clear the process state in redux
    clear();
    setFormMode(false);
    setBtnText("Add LoginId");
    dispatch(clearProcess());
  };

  const failureHandler = () => {
    //if failure to add==> setBtnText to 'Retry'
    setBtnText("Retry");
  };
  //___Function to toggle form
  const fromToggle = () => {
    setFormMode(!formMode);
    // setInProcess(false);
    setBtnText("Add LoginId");
    dispatch(clearProcess());
    clear();
  };
  //___UTILITY function to clear inputFields on form Closing
  const clear = () => {
    setCurrentId(null);
    setLoginData({
      website: "",
      username: "",
      password: "",
    });
  };
  //___This function prevent default behaviour of form submitting
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // const inProcessing = () => {
  //   setInProcess(!inProcess);
  // };
  // inProcessing();

  return (
    <motion.div
      initial={false}
      variants={variants}
      animate={formMode ? "open" : "closed"}
      className={styles.formComponent}
    >
      <form className={styles.formTag} onSubmit={handleSubmit}>
        {/* ___HEADING_________ */}
        <div className={styles.headingWrapper}>
          <div className={btnStyles.cancelBtnDiv} onClick={fromToggle}>
            <HiX fontSize="15px" />
          </div>
          <p className={styles.HeadingText}>Add new loginId</p>
        </div>
        {/* ___WEBSITE WRAPPER__________ */}
        <div className={styles.websiteWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Website</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              ref={websiteInputRef}
              list="websites"
              required
              name="website"
              className={styles.inputField}
              type="text"
              placeholder="Enter website or app"
              value={loginData.website}
              onChange={(e) =>
                setLoginData({ ...loginData, website: e.target.value })
              }
            />
            <datalist id="websites">
              <option value="Amazon" />
              <option value="Apple" />
              <option value="Apple Music" />
              <option value="Apple Pay" />
              <option value="Adobe" />
              <option value="AWS" />
              <option value="Airbnb" />
              <option value="Dribble" />
              <option value="Dell" />
              <option value="Dropbox" />
              <option value="Facebook" />
              <option value="Flipkart" />
              <option value="Google" />
              <option value="Gmail" />
              <option value="Google Pay" />
              <option value="Google Photos" />
              <option value="GeeksforGeeks" />
              <option value="Google Drive" />
              <option value="Github" />
              <option value="Heroku" />
              <option value="Hp" />
              <option value="Instagram" />
              <option value="Imdb" />
              <option value="LinkedIn" />
              <option value="Medium" />
              <option value="Microsoft" />
              <option value="Netflix" />
              <option value="Netlify" />
              <option value="Oracle" />
              <option value="PayPal" />
              <option value="Pinterest" />
              <option value="Phonepe" />
              <option value="Paytm" />
              <option value="Playstore" />
              <option value="Quora" />
              <option value="Samsung" />
              <option value="Slack" />
              <option value="Snapchat" />
              <option value="Spotify" />
              <option value="Stackoverflow" />
              <option value="Twitter" />
              <option value="Youtube" />
            </datalist>
          </div>
        </div>
        {/* USERNAME WRAPPER__________ */}
        <div className={styles.userNameWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Username</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              ref={userNameInputRef}
              required
              name="username"
              className={styles.inputField}
              type="text"
              placeholder="Enter username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
          </div>
        </div>
        {/* PASSWORD WRAPPER__________ */}
        <div className={styles.passwordWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Password</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              ref={passwordInputRef}
              required
              name="password"
              className={styles.inputField}
              type="text"
              placeholder="Enter password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
        </div>
        {/* ___BUTTON_________ */}
        <div className={styles.buttonWrapper}>
          <button
            type="submit"
            onClick={confirmSave}
            disabled={process.inProcess ? true : false}
          >
            {process.inProcess ? (
              <CircleSpinner size={15} color="white" loading={true} />
            ) : (
              <p>{btnText}</p>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
export default LoginIdForm;

{
  /* <div className={formStyles.formHeadingDiv}>
        {currentId ? <p>Edit</p> : <p>Create New</p>}
      </div>
      <div className={formStyles.formDiv}>
        <form className={formStyles.form} onSubmit={handleSubmit}>
          <div className={formStyles.inputContainer}>
            <TextField
              select
              fullWidth
              name="website"
              variant="outlined"
              label="website"
              size="small"
              value={loginData.website}
              onChange={(e) =>
                setLoginData({ ...loginData, website: e.target.value })
              }
            >
              <MenuItem classes={{ root: "MenuItem" }} value={"Amazon"}>
                Amazon
              </MenuItem>
              <MenuItem value={"Apple"}>Apple</MenuItem>
              <MenuItem value={"Apple Music"}>Apple Music</MenuItem>
              <MenuItem value={"Dribble"}>Dribble</MenuItem>
              <MenuItem value={"Dropbox"}>Dropbox</MenuItem>
              <MenuItem value={"Facebook"}>Facebook</MenuItem>
              <MenuItem value={"Google"}>Google</MenuItem>
              <MenuItem value={"Google Drive"}>Google Drive</MenuItem>
              <MenuItem value={"Github"}>Github</MenuItem>
              <MenuItem value={"Instagram"}>Instagram</MenuItem>
              <MenuItem value={"LinkedIn"}>LinkedIn</MenuItem>
              <MenuItem value={"Netflix"}>Netflix</MenuItem>
              <MenuItem value={"PayPal"}>PayPal</MenuItem>
              <MenuItem value={"Pinterest"}>Pinterest</MenuItem>
              <MenuItem value={"Quora"}>Quora</MenuItem>
              <MenuItem value={"Slack"}>Slack</MenuItem>
              <MenuItem value={"Snapchat"}>Snapchat</MenuItem>
              <MenuItem value={"Spotify"}>Spotify</MenuItem>
              <MenuItem value={"Stackoverflow"}>Stackoverflow</MenuItem>
              <MenuItem value={"Twitter"}>Twitter</MenuItem>
              <MenuItem value={"Youtube"}>Youtube</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </TextField>
          </div>
          <div className={formStyles.inputContainer}>
            <TextField
              fullWidth
              name="username"
              variant="outlined"
              label="username"
              size="small"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
          </div>
          <div className={formStyles.inputContainer}>
            <TextField
              fullWidth
              name="password"
              variant="outlined"
              label="password"
              size="small"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>

          {inProcess === false ? (
            <button type="submit" className={btnStyles.submitBtn}>
              <HiArrowNarrowRight fontSize="20px" />
            </button>
          ) : null}
        </form>
      </div>

      <div className={formStyles.formBtnDiv}>
        {inProcess === true ? (
          <div className={btnStyles.save_cancel_Div}>
            <div className={btnStyles.saveBtnDiv} onClick={confirmSave}>
              <HiCheck fontSize="24px" />
            </div>
            <div className={btnStyles.cancelBtnDiv} onClick={fromToggle}>
              <HiX fontSize="16px" />
            </div>
          </div>
        ) : (
          <div className={btnStyles.cancelBtnDiv} onClick={fromToggle}>
            <HiX fontSize="15px" />
          </div>
        )}
      </div> */
}
