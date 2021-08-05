import React from "react";
import { BiGlobe } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaSnapchatSquare } from "react-icons/fa";
import { RiSnapchatLine } from "react-icons/ri";
import styles from "../css/icons.module.css";
import { Icon } from "@iconify/react";
// import googleDrive from "@iconify/icons-logos/google-drive";
// import paypalIcon from "@iconify/icons-logos/paypal";
import {
  SiAmazon,
  SiApple,
  SiApplemusic,
  SiDribbble,
  SiDropbox,
  SiFacebook,
  SiGoogle,
  SiGoogledrive,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiPaypal,
  SiPinterest,
  SiQuora,
  SiSlack,
  SiSnapchat,
  SiSpotify,
  SiStackoverflow,
  SiTwitter,
  SiYoutube,
  SiNetflix,
  SiMicrosoft,
  SiBlogger,
} from "react-icons/si";

const LoginIdLogo = ({ website }) => {
  let logo = null;
  function capitalize(str) {
    const arrOfWords = str.split(" ");
    const arrOfWordsCased = [];

    for (let i = 0; i < arrOfWords.length; i++) {
      const word = arrOfWords[i];
      arrOfWordsCased.push(word.toLowerCase());
    }
    return arrOfWordsCased.join(" ");
  }
  const toCheckWebsite = capitalize(website);
  console.log(toCheckWebsite);

  if (toCheckWebsite === "microsoft") {
    logo = <Icon icon="logos:microsoft-windows" className={styles.iconifyMS} />;
  }

  if (toCheckWebsite === "gmail") {
    logo = <Icon icon="logos:google-gmail" className={styles.iconifyGmail} />;
  }

  if (toCheckWebsite === "geeksforgeeks") {
    logo = (
      <Icon icon="simple-icons:geeksforgeeks" className={styles.iconifyGFG} />
    );
  }
  if (toCheckWebsite === "apple pay") {
    logo = <Icon icon="cib:apple-pay" className={styles.iconifyApplePay} />;
  }

  if (toCheckWebsite === "flipkart") {
    logo = (
      <Icon icon="simple-icons:flipkart" className={styles.iconifyFlpkrt} />
    );
  }

  if (toCheckWebsite === "google photos") {
    logo = <Icon icon="logos:google-photos" className={styles.iconifyIcon} />;
  }
  if (toCheckWebsite === "samsung") {
    logo = <Icon icon="cib:samsung" className={styles.iconifySamsung} />;
  }
  if (toCheckWebsite === "imdb") {
    logo = <Icon icon="cib:imdb" className={styles.iconifyImdb} />;
  }

  if (toCheckWebsite === "medium") {
    logo = (
      <Icon
        icon="ant-design:medium-workmark-outlined"
        className={styles.iconifyMedium}
      />
    );
  }
  if (toCheckWebsite === "oracle") {
    logo = <Icon icon="logos:oracle" className={styles.iconifyOracle} />;
  }

  if (toCheckWebsite === "netlify") {
    logo = <Icon icon="logos:netlify" className={styles.iconifyNetlify} />;
  }

  if (toCheckWebsite === "heroku") {
    logo = <Icon icon="logos:heroku-icon" className={styles.iconifyHeroku} />;
  }

  if (toCheckWebsite === "aws") {
    logo = <Icon icon="logos:aws" className={styles.iconifyAws} />;
  }

  if (toCheckWebsite === "dell") {
    logo = <Icon icon="cib:dell" className={styles.iconifyDell} />;
  }

  if (toCheckWebsite === "hp") {
    logo = <Icon icon="cib:hp" className={styles.iconifyHp} />;
  }

  if (toCheckWebsite === "airbnb") {
    logo = <Icon icon="logos:airbnb" className={styles.iconifyAirbnb} />;
  }

  if (toCheckWebsite === "phonepe") {
    logo = (
      <Icon icon="simple-icons:phonepe" className={styles.iconifyPhonepe} />
    );
  }

  if (toCheckWebsite === "paytm") {
    logo = <Icon icon="simple-icons:paytm" className={styles.iconifyPaytm} />;
  }
  if (toCheckWebsite === "adobe") {
    logo = <Icon icon="bx:bxl-adobe" className={styles.iconifyAdobe} />;
  }

  if (toCheckWebsite === "google pay") {
    logo = <Icon icon="logos:google-pay-icon" className={styles.iconifyGpay} />;
  }

  if (toCheckWebsite === "playstore") {
    logo = <Icon icon="flat-ui:google" className={styles.iconifyPstore} />;
  }

  if (toCheckWebsite === "amazon") {
    logo = <SiAmazon className={styles.icon} />;
  }
  if (toCheckWebsite === "apple") {
    logo = <SiApple color="gray" className={styles.icon} />;
  }
  if (toCheckWebsite === "apple music") {
    logo = <SiApplemusic color="#fa324a" className={styles.icon} />;
  }
  if (toCheckWebsite === "dribble") {
    logo = <SiDribbble color="#e54885" className={styles.icon} />;
  }
  if (toCheckWebsite === "dropbox") {
    logo = <SiDropbox color="#005ef7" className={styles.icon} />;
  }
  if (toCheckWebsite === "facebook") {
    logo = <SiFacebook color="#4267B2" className={styles.icon} />;
  }
  if (toCheckWebsite === "google") {
    logo = <FcGoogle className={styles.icon} />;
  }
  if (toCheckWebsite === "google drive") {
    logo = <Icon icon="logos:google-drive" className={styles.icon} />;
  }
  if (toCheckWebsite === "github") {
    logo = <SiGithub color="#313131" className={styles.icon} />;
  }
  if (toCheckWebsite === "instagram") {
    logo = <SiInstagram color="#c41b59" className={styles.icon} />;
  }
  if (toCheckWebsite === "linkedin") {
    logo = <SiLinkedin color="#0076B3" className={styles.icon} />;
  }
  if (toCheckWebsite === "netflix") {
    logo = <SiNetflix color="#dd0812" className={styles.icon} />;
  }
  if (toCheckWebsite === "paypal") {
    logo = <Icon icon="logos:paypal" className={styles.icon}  />;
  }
  if (toCheckWebsite === "pinterest") {
    logo = <SiPinterest color="#df0022" className={styles.icon} />;
  }
  if (toCheckWebsite === "quora") {
    logo = <SiQuora color="#b32a26" className={styles.icon} />;
  }
  if (toCheckWebsite === "slack") {
    logo = <Icon icon="grommet-icons:slack" className={styles.iconifySlack} />;
  }
  if (toCheckWebsite === "snapchat") {
    logo = (
      <Icon icon="ph:snapchat-logo-thin" className={styles.iconifySnapchat} />
    );
  }
  if (toCheckWebsite === "spotify") {
    logo = <SiSpotify color="#1DB954" className={styles.icon} />;
  }
  if (toCheckWebsite === "stackoverflow") {
    logo = (
      <Icon
        icon="logos:stackoverflow-icon"
        className={styles.iconifyStoveflw}
      />
    );
  }
  if (toCheckWebsite === "twitter") {
    logo = <SiTwitter color="#1c9cea" className={styles.icon} />;
  }
  if (toCheckWebsite === "youtube") {
    logo = <SiYoutube color="#f70000" className={styles.icon} />;
  }
  if (logo === null) {
    const logoText = website[0];
    const logoTextUppercase = logoText.toUpperCase();
    logo = (
      <div className={styles.noLogo}>
        <p>{logoText}</p>
      </div>
    );
  }

  return <>{logo}</>;
};

export default LoginIdLogo;
