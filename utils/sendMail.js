// import nodemailer from "nodemailer";
// import googleapis from "googleapis";
// const { google } = googleapis;

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
  GMAIL_PASS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
  OAUTH_PLAYGROUND
);

// const oauth2Client = new google.auth.OAuth2(
//   MAILING_SERVICE_CLIENT_ID,
//   MAILING_SERVICE_CLIENT_SECRET,
//   MAILING_SERVICE_REFRESH_TOKEN,
//   SENDER_EMAIL_ADDRESS,
//   OAUTH_PLAYGROUND
// );

//send mail
const sendEmail = (to, url, txt) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      pass: GMAIL_PASS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
      tls: {
        rejectUnauthorized: false,
      },
    },
  });

  smtpTransport.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`server ready to take messages:${success}`);
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "eCrypt",
    html: `<h3>${txt}</h3> 
    <div style="width:120px; height:40px;border-radius:5px; background-color:#3d6cb9 ; ">
    <a style="color:white;margin:20px 10px 10px 10px; display:flex;justify-content:center; align-items:center; text-align:center" href=${url}><p style="margin:10px 0px 0px 10px;">Click Here!</p></a>
    </div>`,
  };

  //   smtpTransport.sendMail(mailOptions, (err, info) => {
  //     if (err) {
  //       console.log("error in sending mail", err, info);
  //       // return info;
  //     }
  //       else{
  //         console.log(info)
  //       }
  //     }
  //   );
  // };
  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });
};
// export default sendEmail;
module.exports = sendEmail;
