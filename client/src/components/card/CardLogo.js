import React from "react";
import styles from "../../css/card/card.module.css";
import mastercard from "../../img/mastercard.png";
import visa from "../../img/visa.png";
import maestro from "../../img/maestro.png";
import rupay from "../../img/rupay.png";
import amex from "../../img/amex.png";
import jcb from "../../img/jcb.png";
import discover from "../../img/discover.png";
import diners from "../../img/diners.png";
import hipercard from "../../img/hipercard.png";
import unionpay from "../../img/unionpay.png";
import solo from "../../img/solo.png";
import switchLogo from "../../img/switchLogo.png";
import cardLogoStyles from "../../css/card/logos.module.css";
const getCardType = (number) => {
  const numberFormatted = number.replace(/\D/g, "");
  var patterns = {
    VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MASTER:
      /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
    AMEX: /^3[47][0-9]{13}$/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
    DINERS: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    DISCOVERY: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    HIPERCARD: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
    MAESTRO:
    /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/,
      // /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    UNIONPAY: /^(62|88)\d+$/,
    RUPAY: /^6(?!011)(?:0[0-9]{14}|52[12][0-9]{12})$/,
    SOLO: /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/,
    SWITCH:
      /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
  };
  for (var key in patterns) {
    if (patterns[key].test(numberFormatted)) {
      return key;
    }
  }
};
const CardLogo = ({ cardNo }) => {
  const cardNumber = cardNo;
  const cNo = cardNumber.toString();

  const cardType = getCardType(cNo);

  let logo;
  if (cardType === "VISA") {
    logo = (
      <img className={`${styles.logo} ${cardLogoStyles.visaLogo}`} src={visa} />
    );
  }
  if (cardType === "MASTER") {
    logo = (
      <img
        className={`${styles.logo} ${cardLogoStyles.masterLogo}`}
        src={mastercard}
      />
    );
  }
  if (cardType === "RUPAY") {
    logo = (
      <img
        className={`${styles.logo} ${cardLogoStyles.rupayLogo}`}
        src={rupay}
      />
    );
  }
  if (cardType === "MAESTRO") {
    logo = (
      <img
        className={`${styles.logo} ${cardLogoStyles.maestroLogo}`}
        src={maestro}
        alt='maestro'
      />
    );
  }
  if (cardType === "AMEX") {
    logo = (
      <img className={`${styles.logo} ${cardLogoStyles.amexLogo}`} src={amex} />
    );
  }
  if (cardType === "JCB") {
    logo = (
      <img className={`${styles.logo} ${cardLogoStyles.jcbLogo}`} src={jcb} />
    );
  }
  if (cardType === "DISCOVERY") {
    logo = (
      <img
        className={`${styles.logo} ${cardLogoStyles.discoverLogo}`}
        src={discover}
      />
    );
  }
  if (cardType === "UNIONPAY") {
    logo = (
      <img
        className={`${styles.logo} ${cardLogoStyles.unionLogo}`}
        src={unionpay}
      />
    );
  }
  if (cardType === "DINERS") {
    logo = (
      <img
        className={`${styles.logo} ${cardLogoStyles.dinersLogo}`}
        src={diners}
      />
    );
  }
  if (cardType === "HIPERCARD") {
    logo = (
      <img
        className={`${styles.logo} ${cardLogoStyles.hiperLogo}`}
        src={hipercard}
      />
    );
  }
  if (cardType === "SOLO") {
    logo = (
      <img className={`${styles.logo} ${cardLogoStyles.soloLogo}`} src={solo} />
    );
  }
  if (cardType === "SWITCH") {
    logo = (
      <img
        className={`${styles.logo} ${cardLogoStyles.switchLogo}`}
        src={switchLogo}
      />
    );
  }

  return <>{logo}</>;
};

export default CardLogo;
export { getCardType };
