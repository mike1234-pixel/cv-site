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

  //   async function main() {
  //   let testAccount = await nodemailer.createTestAccount();

  //   // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: testAccount.user, // generated ethereal user
  //       pass: testAccount.pass, // generated ethereal password
  //     },
  //   });
  
  //   // send mail with defined transport object
  //   let info = await transporter.sendMail({
  //     from: '"Fred Foo 👻" <'+email+'>', // sender address
  //     to: "miketandy@protonmail.com", // list of receivers
  //     subject: "Contact Form Message", // Subject line
  //     text: message, // plain text body
  //     html: "<p>"+new Date()+"</p>", // html body
  //   });
  // }
  // main().catch(console.error);

  res.redirect('/')
})
}