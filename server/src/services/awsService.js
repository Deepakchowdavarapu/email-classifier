// const ses = require('../config/aws');

// const sendEmail = async (to, subject, body) => {
//   const params = {
//     Source: 'your-email@example.com',
//     Destination: {
//       ToAddresses: [to]
//     },
//     Message: {
//       Subject: {
//         Data: subject
//       },
//       Body: {
//         Text: {
//           Data: body
//         }
//       }
//     }
//   };

//   try {
//     const result = await ses.sendEmail(params).promise();
//     console.log('Email sent:', result);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// module.exports = { sendEmail };