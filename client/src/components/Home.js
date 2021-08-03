import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import homeStyles from "../css/home.module.css";
import ContentDisplay from "./ContentDisplay";
import SidebarStyles from "../css/sidebar.module.css";
import navStyles from "../css/navbar.module.css";
import docStyles from "../css/docMaximize.module.css";

import Sidebar from "./Sidebar";
import { logout } from "../actions/auth";
import Navbar from "./Navbar";
import TabBar from "./TabBar";
import MaximizeDoc from "./MaximizeDoc";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const node = useRef();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(true);
  const [heading, setHeading] = useState();
  const [fieldLength, setFieldLength] = useState();

  const [maximizeOrNot, setMaximizeOrNot] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className={homeStyles.homeComponent}>
      <div className={navStyles.popupWrapper} ref={node}>
        {open && (
          <div className={`${navStyles.popUp}`}>
            <div className={navStyles.nameDiv}>
              <p>{user.firstName + " " + user.lastName}</p>
            </div>
            <div className={navStyles.lgOutBtnDiv} onClick={handleLogout}>
              <p>Log Out</p>
            </div>
          </div>
        )}
      </div>

      {maximizeOrNot && (
        <MaximizeDoc
          maximizeOrNot={maximizeOrNot}
          setMaximizeOrNot={setMaximizeOrNot}
          imageData={imageData}
          setImageData={setImageData}
          showHeaderFooter={showHeaderFooter}
          setShowHeaderFooter={setShowHeaderFooter}
          fieldLength={fieldLength}
        />
      )}

      {/* <Sidebar /> */}
      <Navbar
        fieldLength={fieldLength}
        setFieldLength={setFieldLength}
        open={open}
        setOpen={setOpen}
        node={node}
      />

      <TabBar fieldLength={fieldLength} />

      <ContentDisplay
        heading={heading}
        setHeading={setHeading}
        fieldLength={fieldLength}
        setFieldLength={setFieldLength}
        imageData={imageData}
        setImageData={setImageData}
        maximizeOrNot={maximizeOrNot}
        setMaximizeOrNot={setMaximizeOrNot}
        showHeaderFooter={showHeaderFooter}
        setShowHeaderFooter={setShowHeaderFooter}
      />
    </div>
  );
};

export default Home;

// const [docMaximizeOrNot, setDocMaximizeOrNot] = useState(false);
// const [maxImgData, setMaxImgData] = useState(null);
// const [showMaxImgTitleBtnContainer, setMaxImgTitleBtnContainer] =
//   useState(true);
// const [maxImgEditMode, setMaxImgEditMode] = useState(false);
// const [deleteModalShow, setDeleteModalShow] = useState(false);

// const handleMaxImgClick = () => {
//   setMaxImgTitleBtnContainer(!showMaxImgTitleBtnContainer);
// };
// const handleMaxImgEditBtnClick = () => {
//   setMaxImgEditMode(!maxImgEditMode);
// };

// const handleMaxImgSave = () => {
//   dispatch(editDoc(maxImgData._id, user._id, maxImgData));
//   setMaxImgEditMode(false);
// };
// const minimizeImg = () => {
//   setDocMaximizeOrNot(false);
//   setMaxImgEditMode(false);
//   setMaxImgTitleBtnContainer(true);
// };

// const handleDeleteClick = () => {
//   setDeleteModalShow(!deleteModalShow);
// };
// const confirmDelete = () => {
//   dispatch(
//     deleteDoc(
//       maxImgData.cloudinary_id,
//       user._id,
//       maxImgData._id,
//       maxImgData.imageName
//     )
//   );
//   setDeleteModalShow(!deleteModalShow);
//   setDocMaximizeOrNot(false);
//   setMaxImgEditMode(false);
// };
// useEffect(() => {
//   console.log(maxImgData);
// }, [maxImgData]);

// const handleFavToggle = (docId, favValue) => {
//   let isFav;
//   if (favValue === false) {
//     isFav = true;
//   } else {
//     isFav = false;
//   }
//   setMaxImgData({
//     ...maxImgData,
//     isFavourite: isFav,
//   });
//   dispatch(docFavToggle(maxImgData._id, isFav));
// };

{
  /* <div className={homeStyles.hamburgerContainer} onClick={toggleSidebar}>
        {sidebarShow === true ? (
          <HiX className={SidebarStyles.hamXIcon} />
        ) : (
          <HiMenuAlt2 className={SidebarStyles.hamMenuIcon} />
        )}
      </div> */
}

{
  /* <div className={homeStyles.headingDiv}>
        <div className={homeStyles.headingTextWrapper}>
          {fieldLength > 0 && searchResultArray.length > 0 ? (
            <p className={homeStyles.headingText}>Search Results</p>
          ) : (
            <p className={homeStyles.headingText}>{heading}</p>
          )}
        </div>
      </div> */
}
// <div className={docStyles.maximizeImgWrapper}>
//   {deleteModalShow === true ? (
//     <div className={docStyles.modalContainer}>
//       <div className={docStyles.dialogDiv}>
//         <p>Are you sure you want to delete this item permanently ?</p>
//       </div>
//       <div className={docStyles.modalBtnDiv}>
//         <div
//           className={docStyles.modalCancelBtn}
//           onClick={() => {
//             setDeleteModalShow(!deleteModalShow);
//           }}
//         >
//           <p>Cancel</p>
//         </div>
//         <div
//           className={docStyles.modalConfirmBtn}
//           onClick={() => {
//             confirmDelete(maxImgData._id);
//           }}
//         >
//           {crud.inProcess ? (
//             <CircleSpinner size={12} color="white" loading={true} />
//           ) : (
//             <p>Sure, Delete ! </p>
//           )}
//         </div>
//       </div>
//     </div>
//   ) : null}

//   <div className={docStyles.maximizeImgContainer}>
//     {showMaxImgTitleBtnContainer && (
//       <div className={docStyles.docHeaderBtnWrapper}>
//         <div
//           className={docStyles.maxImgCloseBtnDiv}
//           onClick={minimizeImg}
//         >
//           <HiOutlineArrowNarrowLeft
//             className={docStyles.minimizeIcon}
//           />
//         </div>
//         <div className={docStyles.docHeaderBtnContainer}>
//           {!maxImgEditMode && (
//             <div
//               className={docStyles.maxImgDeleteDiv}
//               onClick={() => {
//                 handleDeleteClick();
//               }}
//             >
//               <Icon
//                 icon={trashEmpty}
//                 className={docStyles.deleteIcon}
//                 color="#9baece"
//               />
//             </div>
//           )}
//           <div className={docStyles.maxImgFavBtnContainer}>
//             <div
//               className={docStyles.maxImgFavBtnDiv}
//               onClick={() => {
//                 handleFavToggle(maxImgData._id, maxImgData.isFavourite);
//               }}
//             >
//               {maxImgData.isFavourite ? (
//                 <Icon
//                   icon={starSolid}
//                   className={docStyles.favIcon}
//                   color="#00b7fd"
//                 />
//               ) : (
//                 <Icon
//                   className={docStyles.favIcon}
//                   icon={starLine}
//                   color="#9baece"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     )}
//     <img
//       className={docStyles.maxImage}
//       src={maxImgData.imageUrl}
//       onClick={handleMaxImgClick}
//     ></img>
//     {showMaxImgTitleBtnContainer && (
//       <div className={docStyles.docTitleWrapper}>
//         <div className={docStyles.docTitleContainer}>
//           <div className={docStyles.docTitleDiv}>
//             {!maxImgEditMode ? (
//               <p className={docStyles.maxImgTitleText}>
//                 {maxImgData.imageName}
//               </p>
//             ) : (
//               <input
//                 className={docStyles.maxImgTitleInput}
//                 value={maxImgData.imageName}
//                 onChange={(e) =>
//                   setMaxImgData({
//                     ...maxImgData,
//                     imageName: e.target.value,
//                   })
//                 }
//               ></input>
//             )}
//           </div>

//           <div className={docStyles.docEditBtnContainer}>
//             {!maxImgEditMode ? (
//               <div
//                 className={docStyles.maxImgEditDiv}
//                 onClick={handleMaxImgEditBtnClick}
//               >
//                 <Icon
//                   icon={pencilIcon}
//                   className={docStyles.pencilIcon}
//                   color="#9baece"
//                 />
//               </div>
//             ) : (
//               <>
//                 <div
//                   className={docStyles.maxImgSaveDiv}
//                   onClick={handleMaxImgSave}
//                 >
//                   <HiCheck
//                     color="#9baece"
//                     className={docStyles.saveIcon}
//                   />
//                 </div>
//                 <div
//                   className={docStyles.maxImgCancelDiv}
//                   onClick={handleMaxImgEditBtnClick}
//                 >
//                   <HiX
//                     color="#9baece"
//                     className={docStyles.cancelIcon}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// </div>
