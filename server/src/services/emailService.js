const imaps = require('imap-simple');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { getToken } = require('../config/OAuth2');
const Email = require('../models/emailSchema');
const schedule = require('node-schedule')
dotenv.config();

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saideepakch0@gmail.com',
    pass: 'pksoxpbcigcgpxqp'
  }
});

const sendEmail = async (to, subject, body, htmlBody=null) => {
  const mailOptions = {
    from: 'saideepakch0@gmail.com',
    to: to,
    subject: subject,
    text: body,
    html: htmlBody
  };

  try {

    //sending mail through transporter
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
    
    // Store the email in MongoDB
    const emailRecord = new Email({
      subject: subject,
      sender: 'saideepakch0@gmail.com',
      recipient: to,
      body: body,
      htmlBody: htmlBody,
      timestamp: new Date(),
    });
    
    await emailRecord.save();
    console.log('Email stored in database');
    
    return { 
      success: true, 
      messageId: result.messageId,
      emailRecord: emailRecord
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const fetchEmails = async () => {
  try {
    const emails = await Email.find({});
    return emails;
  } catch (error) {
    console.error('Error fetching emails from database:', error);
    throw error;
  }
};

const scheduleEmail = (to, subject, body, sendTime) => {
  const email_to_schedule = {
    from: 'saideepakch0@gmail.com',
    to: to,
    subject: subject,
    text: body,
  };

  schedule.scheduleJob(sendTime, async () => {
    try {
      // Await the result of the asynchronous sendMail operation

      console.log(`about to send a email `)
      const result = await transporter.sendMail(email_to_schedule);
      console.log(`schedule email successful`, result);

      // Create a new email record to store in MongoDB
      const email_to_mongoDB = new Email({
        subject: subject,
        to: to,
        body: body,
        sentAt: new Date().toString() // Correct usage of Date.toString()
      });

      // Save the email record to MongoDB
      await email_to_mongoDB.save();

      return{
        success:true,
        email_sent:email_to_mongoDB
      }
    } catch (err) {
      console.log(`error: ` + err);
    }
  });
};

module.exports = { sendEmail, fetchEmails ,scheduleEmail};