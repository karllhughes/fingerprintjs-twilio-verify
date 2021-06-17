# Using FingerprintJS with Twilio Verify

This demo application shows you how to use [FingerprintJS](https://fingerprintjs.com/) to minimize your SMS costs while using Twilio Verify for two-factor authentication.

## Local Use
Copy `.env.example` to `.env` and add your Twilio account details.

Update `routes/auth.js` by adding your details:

```javascript
{
    id: 1,
    username: 'your_name',
    password: 'your_password',
    phone: 'your_phone',
    lastKnownVisitorId: 'your_visitor_id',
}
```

Install the dependencies and start the server:

```
npm install
npm start
```

Login at `localhost:3000`. If you haven't entered a `lastKnownVisitorId`, you'll be prompted for 2FA.

![Login screen](/login.png)

If your `lastKnownVisitorId` matches your current visitor ID, you'll be logged in directly.
