# sending emails.

Using the **Mailtrap API SDK**. 
- using direct API calls or
- can use features that the SDK specifically provides, 
such as templating or easier access to Mailtrap’s test inboxes.

Here’s how you can set up and use Mailtrap with their SDK in a Node.js application:

## 1. **Requirements**

For using the SDK, you need:
   - **Node.js and npm** for dependency management.
   - **Mailtrap account** with API credentials.
   - **Mailtrap API SDK** for Node.js.

### Install Mailtrap SDK
Install the official `@mailtrap/mailtrap-client` SDK package:
```bash
npm install @mailtrap/mailtrap-client
```

## 2. **Get Mailtrap API Token**

In your Mailtrap account:
   1. Go to **API** settings.
   2. Copy your **API Token** to use it in the SDK.


## 3. **Project Setup and Imports**

Import the SDK in your Node.js app (e.g., `emailService.js`), and set up your environment variables to hold sensitive information.

#### Example `.env` File:
```plaintext
MAILTRAP_API_TOKEN=your_mailtrap_api_token
```

#### Import Packages
```javascript
import { MailtrapClient } from '@mailtrap/mailtrap-client';
import dotenv from 'dotenv';

dotenv.config();
```

## 4. **Initialize Mailtrap Client**

Create a Mailtrap client instance by initializing `MailtrapClient` with the API token:

```javascript
const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
```

### 5. **Define the Email-Sending Function**

Now, set up a function to handle email-sending with the SDK. This function will define email properties and use the Mailtrap client to send the email.

```javascript
//import client 

async function sendTestEmail(to, subject, text, html) {
  try {
    const senderEmail = 'no-reply@yourapp.com';
    const senderName = 'Your App Name';

    const response = await client.send({
      from: {
        email: senderEmail,
        name: senderName,
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      text: text,
      html: html,
    });

    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
```

### 6. **Using the Email-Sending Function**

Now, you can use the `sendTestEmail` function within any route or controller. Here’s an example of using it in a signup controller:

```javascript
import { sendTestEmail } from './emailService.js';

async function signup(req, res) {
  const { email, name } = req.body;
  // User creation logic here

  // Send welcome email
  await sendTestEmail(
    email,
    'Welcome to our app!',
    'Thank you for signing up!',
    '<h1>Welcome to our app!</h1><p>Thank you for signing up!</p>'
  );

  res.status(200).json({ message: 'Signup successful, check your email!' });
}
```

### 7. **Putting It All Together**

Here’s the `emailService.js` file for Mailtrap SDK:

```javascript
import { MailtrapClient } from '@mailtrap/mailtrap-client';
import dotenv from 'dotenv';

dotenv.config();

const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });

export async function sendTestEmail(to, subject, text, html) {
  try {
    const senderEmail = 'no-reply@yourapp.com';
    const senderName = 'Your App Name';

    const response = await client.send({
      from: {
        email: senderEmail,
        name: senderName,
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      text: text,
      html: html,
    });

    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
```

### Summary of the Workflow with Mailtrap SDK

1. **Install Mailtrap SDK** and add Mailtrap API credentials to `.env`.
2. **Initialize Mailtrap Client** with API token.
3. **Create an email-sending function** to specify email properties.
4. **Use the function** where emails are needed, such as in user registration.
5. **Run your application** and check Mailtrap inbox for test emails.

The SDK simplifies handling emails by providing direct API access, and it may offer added flexibility or specific Mailtrap features, such as integration with custom templates.