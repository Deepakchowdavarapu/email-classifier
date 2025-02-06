# Email Control Program

## A System for Efficient Email Management and Spam Detection

### Introduction
The **Email Control Program** is designed to efficiently manage a high volume of emails, automate responses, and classify incoming messages as spam or ham. The system is built using **Node.js, MongoDB, and Amazon SES** and now includes a spam detection feature using **Logistic Regression** with `TfidfVectorizer`.

### Features
- Fetch and manage over 100,000 emails efficiently.
- Automatically pull important emails from spam or promotion folders.
- Classify emails as spam or ham using a trained machine learning model.
- Send specific content responses based on classification.
- Maintain a good IP reputation by avoiding flagged emails.

### Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Services**: Amazon SES
- **Machine Learning**: Logistic Regression, TfidfVectorizer (Python, scikit-learn)
