import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

//creating a client based on the token assigned during login
export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

//Defining the sender for mails.
export const sender = {
  email: "hello@demomailtrap.com",
  name: "Sarthak Gautam",
};






//------------------------------------------------------------
/* test recepient 
const recipients = [
  {
    email: "falsemediapunta@gmail.com",
  }
];

Note: recipients are in form of arrays of object containing email object.
*/

//sending process :    .send({from:, to:, subject:, html:,})
/*
client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    //text: "Congrats for sending test email with Mailtrap!"
    html:"Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);

  */