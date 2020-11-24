const nodemailer   = require('nodemailer');
const json              = require('../data/projects.json');

module.exports = function (app) {
// get project data
app.route('/data/projects').get((req, res) => {
    res.send(json)
})

// post contact form
app.route('/contact').post((req, res) => {

        const transporter = nodemailer.createTransport({
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