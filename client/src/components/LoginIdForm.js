import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, MenuItem } from "@material-ui/core";

import { HiX, HiCheck, HiArrowNarrowRight } from "react-icons/hi";

import { addNewLoginId, editLoginId } from "../actions/loginInIdsAction";
import formStyles from "../css/loginIdForm.module.css";
import btnStyles from "../css/buttons.module.css";

const LoginIdForm = ({ currentId, setCurrentId, formMode, setFormMode }) => {
  const [loginData, setLoginData] = useState({
    website: "",
    username: "",
    password: "",
  });

  const [inProcess, setInProcess] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);

  const loginIdDataToEdit = useSelector((state) =>
    currentId ? state.logins.loginIds.find((l) => l._id === currentId) : null
  );

  useEffect(() => {
    if (loginIdDataToEdit) setLoginData(loginIdDataToEdit);
  }, [loginIdDataToEdit]);

  const confirmSave = () => {
    if (currentId) {
      dispatch(editLoginId(currentId, loginData));
    } else {
      dispatch(addNewLoginId(loginData, userId));
    }
    clear();
    setFormMode(!formMode);
    inProcessing();
  };

  const fromToggle = () => {
    setFormMode(!formMode);
    setInProcess(false);
    clear();
  };
  const inProcessing = () => {
    setInProcess(!inProcess);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    inProcessing();
  };
  const clear = () => {
    setCurrentId(null);
    setLoginData({
      website: "",
      username: "",
      password: "",
    });
  };

  return (
    <div
      className={
        formMode === false
          ? formStyles.formContainerCollapse
          : formStyles.formContainer
      }
    >
      <div className={formStyles.formHeadingDiv}>
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
      </div>
    </div>
  );
};
export default LoginIdForm;
