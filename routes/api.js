const nodemailer   = require('nodemailer');
const json              = require('../data/projects.json');
var nodeoutlook = require('nodejs-nodemailer-outlook');

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

    const myEmail = process.env.EMAIL;
    const myProtonEmail = process.env.PROTON_EMAIL;
    const myPassword = process.env.EMAIL_PASSWORD;

    var nodeoutlook = require('nodejs-nodemailer-outlook')
nodeoutlook.sendEmail({
    auth: {
        user: myEmail,
        pass: myPassword
    },
    from: myEmail,
    to: 'miketandy@protonmail.com',
    subject: "You've Got Mail",
    html: `<b>Email: ${email}, Name: ${name}, Message: ${message}</b>`,
    text: 'This is text version!',})

    // async function main(){

    //     let transporter = nodemailer.createTransport({
    //         host: 'smtp.office365.com', //"smtp-mail.outlook.com", // hostname
    //         secureConnection: false, // TLS requires secureConnection to be false
    //         port: 587, // port for secure SMTP
    //         requireTLS: true,
    //         auth: {
    //             user: myEmail,
    //             pass: myPassword
    //         },
    //         tls: {
    //             ciphers:'SSLv3'
    //         } 
    //       });
    
    //     let info = await transporter.sendMail({
    //       from: `"Me" <${myEmail}>`,
    //       to: myProtonEmail,
    //       subject: "You've Got Mail",
    //       text: `name ${name}, email ${email}, message ${message}` 
    //     });
    
    //     console.log("Email sent");
    //   }
    // main().catch(console.error);

  res.redirect('/')
})
}