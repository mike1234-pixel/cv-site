const nodemailer   = require('nodemailer');
const json              = require('../data/projects.json');

module.exports = function (app) {
// get project data
app.route('/data/projects').get((req, res) => {
    res.send(json)
})

// google-OAuth
const { google }      = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// post contact form
app.route('/contact').post((req, res) => {

      // OAUTH
      const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );

      myOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
      });
      let myAccessToken = myOAuth2Client.getAccessToken();

        // NODEMAILER
        var transporter = nodemailer.createTransport({
          // service: "gmail",
          // auth: {
          //   type: "OAuth2",
          //   user: process.env.EMAIL,
          //   clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
          //   clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
          //   refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
          //   accessToken: myAccessToken,
          // },
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
          }
        });

        let mailtoMeMailOptions = {
          from: process.env.EMAIL,
          to: process.env.PROTON_EMAIL,
          subject: "You've Got Mail",
          text: `NAME: ${req.body.name} EMAIL ${req.body.email} MESSAGE ${req.body.message}`,
        };

        let mailtoSenderMailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Thanks for Getting In Touch",
          text: "I have received your message and will be in touch with you shortly.",
        };

        transporter.sendMail(mailtoMeMailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        transporter.sendMail(mailtoSenderMailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        transporter.close();

        res.redirect('/')
})

}