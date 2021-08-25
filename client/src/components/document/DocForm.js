import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewDoc } from "../../actions/documentsAction";
import styles from "../../css/document/docFormNew.module.css";
import { HiX, HiArrowNarrowRight } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import axios from "axios";

const variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    // opacity: 0.5,
    scale: 0,
  },
};
const DocForm = ({ formMode, setFormMode }) => {
  const userId = useSelector((state) => state.user.user._id);

  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [previewImg, setPreviewImg] = useState("");

  const formToggle = () => {
    setFormMode(!formMode);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setPreviewImg(reader.result);
      console.log(reader.result);
    };
  };

  const uploadDoc = () => {
    // e.preventDefault();
    formToggle();
    const data = new FormData();
    data.append("userId", userId);
    data.append("name", name);
    data.append("file", file);
    // console.log(file);
    axios
      .post("https://httpbin.org/anything", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch(addNewDoc(data, name, userId));
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    uploadDoc();
    // console.log(name, file);
  };

  return (
    <motion.div
      initial={false}
      variants={variants}
      animate={formMode ? "open" : "closed"}
      transition={{ type: "tween", duration: 0.1 }}
      className={styles.formComponent}
    >
      <form className={styles.formTag} onSubmit={handleFormSubmit}>
        <div className={styles.cancelBtnDiv} onClick={formToggle}>
          <HiX fontSize="15px" />
        </div>
        <div className={styles.headingWrapper}>
          <p className={styles.heading1}>Upload your file</p>
          <p className={styles.heading2}>File should be image</p>
        </div>
        {/* ___________________________________ */}
        <div className={styles.uploadImgWrapper}>
          {/* <div className={styles.uploadContainer}> */}
          <label htmlFor="file">
            {previewImg ? (
              <div className={styles.imgPreviewContainer}>
                <img src={previewImg} />
              </div>
            ) : (
              <div className={styles.uploadContainer}>
                <Icon icon="bi:folder-fill" className={styles.folderIcon} />
                <p>Click to choose file</p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="file"
            className={styles.imgFileInput}
            onChange={handleChange}
          />
          {/* </div> */}
        </div>

        {/* ___________________________________ */}
        <div className={styles.titleWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Image title</p>
          </div>

          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit">
            <Icon
              icon="eva:arrow-circle-up-outline"
              color="white"
              className={styles.btnIcon}
            />
            <p>Upload</p>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default DocForm;

// return (
//   <div
//     className={
//       formMode === false
//         ? formStyles.docFormContainerCollapse
//         : formStyles.docFormContainer
//     }
//   >
//     <form onSubmit={uploadDoc} method="post" encType="multipart/form-data">
//       <div className={formStyles.fileInputDiv}>
//         <p>Click to choose a file</p>

//         <input
//           type="file"
//           id="file"
//           className={formStyles.fileInput}
//           onChange={(e) => setFile(e.target.files[0])}
//         ></input>
//       </div>

//       <div className={formStyles.titleInputDiv}>
//         <p>Title</p>
//         <input
//           className={formStyles.titleInput}
//           type="text"
//           id="name"
//           onChange={(e) => setName(e.target.value)}
//         ></input>
//       </div>

//       <div className={formStyles.btnDiv}>
//         <button type="submit" className={formStyles.submitBtn}>
//         <p>Add</p>
//         </button>
//       </div>
//     </form>

//     <div className={btnStyles.cancelBtnDiv} onClick={formToggle}>
//       <HiX fontSize="15px" />
//     </div>
//   </div>
// );
