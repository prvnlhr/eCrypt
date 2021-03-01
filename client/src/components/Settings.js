import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  changePassword,
  deleteAccount,
  clearNotification,
} from "../actions/auth";

import { updateProfile } from "../actions/userAction";
import { CircleSpinner } from "react-spinners-kit";
import styles from "../css/settings.module.css";

const Settings = ({ setHeading }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const notification = useSelector((state) => state.notification);

  const [editMode, setEditMode] = useState({
    isEditing: false,
    value: null,
  });
  const [inputState, setInputState] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { firstName, lastName, email } = profileData;
  const { oldPassword, newPassword } = passwordData;

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const handlePassInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    //NOTE: we are passing userId to add activity
    dispatch(changePassword(oldPassword, newPassword, token, user._id));
  };

  const handleAccountDelete = () => {
    dispatch(deleteAccount(oldPassword, token));
  };
  const handleEditProfile = () => {
    //NOTE: we are passing userId to add activity
    dispatch(updateProfile(token, profileData, user._id));
  };
  const switchEditMode = (val) => {
    if (val === 0) {
      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
      console.log("profileData", profileData);
      dispatch(clearNotification("error"));
      dispatch(clearNotification("success"));
    }

    if (notification.error || notification.success) {
      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
      dispatch(clearNotification("error"));
      dispatch(clearNotification("success"));
    }
    setEditMode({
      isEditing: true,
      value: val,
    });
  };
  useEffect(() => {
    setHeading("Settings");
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    console.log(profileData);
  }, [user]);

  useEffect(() => {
    if (notification.success && editMode.isEditing) {
      setEditMode({
        ...editMode,
        isEditing: false,
      });
      if (inputState === false) {
        setInputState(true);
      }
    }
  }, [notification.success]);

  return (
    <div className={styles.settingsComponent}>
      <div className={styles.profileContainer}>
        <div className={styles.notificationDiv}>
          {editMode.value === 1 ? (
            <>
              {notification.error || notification.success ? (
                <div
                  className={
                    notification.error
                      ? styles.notificationErrorDiv
                      : styles.notificationSuccessDiv
                  }
                >
                  {notification.error ? (
                    <p>{notification.error}</p>
                  ) : (
                    <p>{notification.success}</p>
                  )}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
        <div className={styles.headerDiv}>
          <p className={styles.headingText}>Profile</p>
        </div>
        <div className={styles.bodyDiv}>
          <div className={styles.formContainer}>
            <p className={styles.firstNameLabel}>First Name</p>
            <p className={styles.lastNameLabel}>Last Name</p>

            <input
              className={` ${styles.firstNameInput}  ${
                inputState === false ? styles.activeInput : styles.inactiveInput
              }`}
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleProfileInputChange}
              disabled={inputState}
            ></input>
            <input
              className={`${styles.lastNameInput} 
               ${
                 inputState === false
                   ? styles.activeInput
                   : styles.inactiveInput
               }
              `}
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={handleProfileInputChange}
              disabled={inputState}
            ></input>

            <p className={styles.emailLabel}>Email Address</p>
            <input
              className={`${styles.emailInput}
              ${
                inputState === false ? styles.activeInput : styles.inactiveInput
              }
              
              `}
              name="email"
              id="email"
              value={email}
              onChange={handleProfileInputChange}
              disabled={inputState}
            ></input>
          </div>
        </div>
        <div className={styles.profileButtonContainer}>
          {editMode.isEditing && editMode.value === 1 ? (
            <>
              <button className={styles.confirmBtn} onClick={handleEditProfile}>
                {isLoading ? (
                  <CircleSpinner size={10} color="white" loading={true} />
                ) : (
                  "save changes"
                )}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  switchEditMode(0);
                  setInputState(!inputState);
                }}
              >
                cancel
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.editProfileBtn}
                onClick={() => {
                  switchEditMode(1);
                  setInputState(!inputState);
                }}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.changePasswordContainer}>
        <div className={styles.headerDiv}>
          <p className={styles.headingText}>Password</p>
        </div>
        <div className={styles.notificationDiv}>
          {editMode.value === 2 ? (
            <>
              {notification.error || notification.success ? (
                <div
                  className={
                    notification.error
                      ? styles.notificationErrorDiv
                      : styles.notificationSuccessDiv
                  }
                >
                  {notification.error ? (
                    <p>{notification.error}</p>
                  ) : (
                    <p>{notification.success}</p>
                  )}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
        <div className={styles.bodyDiv}>
          {editMode.isEditing && editMode.value === 2 ? (
            <>
              <div className={styles.changePasswordDiv}>
                <input
                  name="oldPassword"
                  placeholder="Enter your old password"
                  id="oldPassword"
                  value={oldPassword}
                  autocomplete="off"
                  onChange={handlePassInputChange}
                ></input>
                <input
                  name="newPassword"
                  placeholder="Enter your new password"
                  id="newPassword"
                  value={newPassword}
                  autocomplete="off"
                  onChange={handlePassInputChange}
                ></input>
              </div>
              <div className={styles.passwordChangeButtonDiv}>
                <button
                  className={styles.confirmBtn}
                  onClick={handlePasswordChange}
                >
                  {isLoading ? (
                    <CircleSpinner size={10} color="white" loading={true} />
                  ) : (
                    "confirm"
                  )}
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => switchEditMode(0)}
                >
                  cancel
                </button>
              </div>
            </>
          ) : (
            <button
              className={styles.changePassBtn}
              onClick={() => switchEditMode(2)}
            >
              Change password
            </button>
          )}
        </div>
      </div>

      <div className={styles.deleteAccountContainer}>
        <div className={styles.headerDiv}>
          <p className={styles.headingText}>Delete Account</p>
        </div>
        <div className={styles.notificationDiv}>
          {editMode.value === 3 ? (
            <>
              {notification.error || notification.success ? (
                <div
                  className={
                    notification.error
                      ? styles.notificationErrorDiv
                      : styles.notificationSuccessDiv
                  }
                >
                  {notification.error ? (
                    <p>{notification.error}</p>
                  ) : (
                    <p>{notification.success}</p>
                  )}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
        <div className={styles.bodyDiv}>
          {editMode.isEditing && editMode.value === 3 ? (
            <>
              <div className={styles.deleteInputDiv}>
                <p className={styles.disclaimer}>Confirm your password</p>

                <input
                  name="oldPassword"
                  placeholder="Enter your old password"
                  id="oldPassword"
                  value={oldPassword}
                  autocomplete="off"
                  onChange={handlePassInputChange}
                ></input>
              </div>

              <div className={styles.deleteBtnDiv}>
                <button
                  className={styles.confirmBtn}
                  onClick={handleAccountDelete}
                >
                  {isLoading ? (
                    <CircleSpinner size={10} color="white" loading={true} />
                  ) : (
                    "confirm"
                  )}
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => switchEditMode(0)}
                >
                  cancel
                </button>
                <br />
              </div>
            </>
          ) : (
            <>
              <p className={styles.disclaimer}>Delete account permanently</p>
              <p className={styles.disclaimer}>
                Deleting your account will delete your profile and all the
                associated data
              </p>
              <p className={styles.disclaimer}>
                You will be logged out after deleting your account
              </p>
              <br />
              <button
                className={styles.deleteAccountBtn}
                onClick={() => switchEditMode(3)}
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
