const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_KEY, DB_HOST } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const createEmailTemplate = (verificationToken, name = 'Guest') => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Contacts API Service',
      link: 'http://localhost:3000',
    },
  });

  const emailTemplate = {
    body: {
      name,
      intro:
        "Welcome to our application! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with application, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `http://localhost:3000/api/users/auth/verify/${verificationToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  return mailGenerator.generate(emailTemplate);
};

const sendEmail = (verificationToken, email) => {
  const emailBody = createEmailTemplate(verificationToken);

  const msg = {
    to: email,
    from: '1927mishakhmara03@gmail.com',
    subject: 'Please verify your account',
    html: emailBody,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = sendEmail;
