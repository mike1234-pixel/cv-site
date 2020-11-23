const nodemailer   = require('nodemailer');
const json              = require('../data/projects.json');

module.exports = function (app) {
// get project data
app.route('/data/projects').get((req, res) => {
    res.send(json)
})

// post contact form
app.route('/contact').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    console.log(name, message)

    async function main(){
        let transporter = nodemailer.createTransport({
            service: "protonmail",
            auth: {
              user: process.env.EMAIL, 
              pass: process.env.EMAIL_PASSWORD,
            }, 
          });
    
        let info = await transporter.sendMail({
          from: '"Me" <miketandy@protonmail.com>',
          to: "me@miketandy.com",
          subject: "You've Got Mail",
          text: message,
          html: `<p>${message}</p>`
        });
    
        console.log("Email sent");
      }
    main().catch(console.error);

  res.redirect('/')
})
}