import React from "react";
import { BiGlobe } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaSnapchatSquare } from "react-icons/fa";
import { RiSnapchatLine } from "react-icons/ri";
import styles from "../css/icons.module.css";
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
} from "react-icons/si";

const LoginIdLogo = ({ website }) => {
  let logo = null;

  if (website === "Amazon") {
    logo = <SiAmazon className={styles.icon} />;
  }
  if (website === "Apple") {
    logo = <SiApple color="gray" className={styles.icon} />;
  }
  if (website === "Apple Music") {
    logo = <SiApplemusic color="#fa324a" className={styles.icon} />;
  }
  if (website === "Dribble") {
    logo = <SiDribbble color="#e54885" className={styles.icon} />;
  }
  if (website === "Dropbox") {
    logo = <SiDropbox color="#005ef7" className={styles.icon} />;
  }
  if (website === "Facebook") {
    logo = <SiFacebook color="#4267B2" className={styles.icon} />;
  }
  if (website === "Google") {
    logo = <FcGoogle className={styles.icon} />;
  }
  if (website === "Google Drive") {
    logo = <SiGoogledrive className={styles.icon} />;
  }
  if (website === "Github") {
    logo = <SiGithub color="#313131" className={styles.icon} />;
  }
  if (website === "Instagram") {
    logo = <SiInstagram color="#c41b59" className={styles.icon} />;
  }
  if (website === "LinkedIn") {
    logo = <SiLinkedin color="#0076B3" className={styles.icon} />;
  }
  if (website === "Netflix") {
    logo = <SiNetflix color="#dd0812" className={styles.icon} />;
  }
  if (website === "PayPal") {
    logo = <SiPaypal color="#253B80" className={styles.icon} />;
  }
  if (website === "Pinterest") {
    logo = <SiPinterest color="#df0022" className={styles.icon} />;
  }
  if (website === "Quora") {
    logo = <SiQuora color="#b32a26" className={styles.icon} />;
  }
  if (website === "Slack") {
    logo = <SiSlack className={styles.icon} />;
  }
  if (website === "Snapchat") {
    logo = <RiSnapchatLine className={styles.snapchatIcon} />;
  }
  if (website === "Spotify") {
    logo = <SiSpotify color="#1DB954" className={styles.icon} />;
  }
  if (website === "Stackoverflow") {
    logo = <SiStackoverflow color="#f79f00" className={styles.icon} />;
  }
  if (website === "Twitter") {
    logo = <SiTwitter color="#1c9cea" className={styles.icon} />;
  }
  if (website === "Youtube") {
    logo = <SiYoutube color="#f70000" className={styles.icon} />;
  }
  if (logo === null) {
    logo = <BiGlobe color="#1b9cc9" className={styles.icon} />;
  }

  return <>{logo}</>;
};

export default LoginIdLogo;
