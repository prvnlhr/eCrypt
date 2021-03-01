import React from "react";
import { useState} from "react";

import homeStyles from "../css/home.module.css";
import ContentDisplay from "./ContentDisplay";
import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

const Home = () => {
  const [heading, setHeading] = useState();
  const [fieldLength, setFieldLength] = useState(null);

  return (
    <div className={homeStyles.homeComponent}>
      <Sidebar />
      <Navbar fieldLength={fieldLength} setFieldLength={setFieldLength} />

      <div className={homeStyles.headingDiv}>
        {fieldLength ? (
          <p className={homeStyles.headingText}>Search Results</p>
        ) : (
          <p className={homeStyles.headingText}>{heading}</p>
        )}
      </div>
      <ContentDisplay
        heading={heading}
        setHeading={setHeading}
        fieldLength={fieldLength}
        setFieldLength={setFieldLength}
      />
    </div>
  );
};

export default Home;
