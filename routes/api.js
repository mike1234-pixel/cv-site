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

    const myEmail = process.env.EMAIL;
    const myProtonEmail = process.env.PROTON_EMAIL;
    const myPassword = process.env.EMAIL_PASSWORD;

    async function main(){

        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            auth: {
                user: myEmail,
                pass: myPassword
            },
            tls: {
                ciphers:'SSLv3'
            } 
          });
    
        let info = await transporter.sendMail({
          from: `"Me" <${myEmail}>`,
          to: myProtonEmail,
          subject: "You've Got Mail",
          text: `name ${name}, email ${email}, message ${message}` 
        });
    
        console.log("Email sent");
      }
    main().catch(console.error);

  res.redirect('/')
})
}