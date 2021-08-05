import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewDoc } from "../actions/documentsAction";
import btnStyles from "../css/buttons.module.css";
import formStyles from "../css/docForm.module.css";

import {} from "react-icons/hi";
import { HiX, HiArrowNarrowRight } from "react-icons/hi";

import axios from "axios";

const DocForm = ({ formMode, setFormMode }) => {
  const userId = useSelector((state) => state.user.user._id);

  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [file, setFile] = useState();

  const formToggle = () => {
    setFormMode(!formMode);
  };

  const uploadDoc = (e) => {
    e.preventDefault();
    formToggle();
    const data = new FormData();
    data.append("userId", userId);
    data.append("name", name);
    data.append("file", file);

    axios
      .post("https://httpbin.org/anything", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch(addNewDoc( data ,name,userId));
  };

  return (
    <div
      className={
        formMode === false
          ? formStyles.docFormContainerCollapse
          : formStyles.docFormContainer
      }
    >
      <form onSubmit={uploadDoc} method="post" encType="multipart/form-data">
        <div className={formStyles.fileInputDiv}>
          <p>Click to choose a file</p>

          <input
            type="file"
            id="file"
            className={formStyles.fileInput}
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </div>

        <div className={formStyles.titleInputDiv}>
          <p>Title</p>
          <input
            className={formStyles.titleInput}
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className={formStyles.btnDiv}>
          <button type="submit" className={formStyles.submitBtn}>
          <p>Add</p>
          </button>
        </div>
      </form>

      <div className={btnStyles.cancelBtnDiv} onClick={formToggle}>
        <HiX fontSize="15px" />
      </div>
    </div>
  );
};

export default DocForm;
