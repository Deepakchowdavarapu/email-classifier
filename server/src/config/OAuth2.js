const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load client secrets from a local file.
let credentials;
try {
  const content = fs.readFileSync(path.join(__dirname, '../../client_secret.json'));
  credentials = JSON.parse(content).web;
} catch (error) {
  console.error('Error loading client secret file:', error);
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

// Generate the URL for user consent
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
});

console.log('Authorize this app by visiting this URL:', authUrl);

// After user grants permission, exchange the code for tokens
const getToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  console.log('Access Token:', tokens.access_token);
  return tokens.access_token;
};

module.exports = { getToken };
