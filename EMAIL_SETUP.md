# Contact Form Email Setup Guide

## Setting up Gmail for the Contact Form

To enable the contact form to send emails to robinjohnaranguiz@gmail.com, follow these steps:

### 1. Create a Gmail App Password

Since regular passwords don't work for third-party apps, you'll need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Under "How you sign in to Google," select **2-Step Verification**
   - If not enabled, enable it first
4. At the bottom, select **App passwords**
5. Select "Mail" as the app and "Other" as the device
6. Name it something like "Portfolio Contact Form"
7. Click **Generate**
8. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### 2. Update Your Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values:

```env
EMAIL_USER=your-actual-gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

For example:
```env
EMAIL_USER=robinjohnaranguiz@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### 3. Restart Your Development Server

After updating the `.env.local` file:
1. Stop the current server (Ctrl+C)
2. Start it again: `npm run dev`

### 4. Test the Contact Form

1. Go to your website
2. Click on the "Socials" tab
3. Scroll down to the "Contact Me" section
4. Fill out the form and submit
5. Check your email at robinjohnaranguiz@gmail.com

## Alternative: Using a Different Email Service

If you prefer to use a different email service, you can modify the `/app/api/contact/route.ts` file:

### For Outlook/Hotmail:
```javascript
service: 'hotmail'
```

### For Other SMTP Services:
```javascript
host: 'smtp.example.com',
port: 587,
secure: false, // true for 465, false for other ports
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
```

## Security Notes

- Never commit `.env.local` to version control (it's already in .gitignore)
- The App Password is different from your regular Gmail password
- If compromised, you can revoke the App Password from your Google Account settings

## Troubleshooting

**"Invalid login"**: Make sure you're using an App Password, not your regular password

**"Less secure app access"**: Gmail requires App Passwords now, this setting is deprecated

**Email not sending**: Check the browser console and terminal for error messages

**Port issues**: Some networks block port 587; you may need to use port 465 with `secure: true`
