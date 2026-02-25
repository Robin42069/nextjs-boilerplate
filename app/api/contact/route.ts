import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create a transporter using Gmail
    // Note: You'll need to set up environment variables for this to work
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password',
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'robinjohnaranguiz@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Name:</strong> 
              <span style="color: #333;">${firstName} ${lastName}</span>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Email:</strong> 
              <a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Subject:</strong> 
              <span style="color: #333;">${subject}</span>
            </p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">Message:</h3>
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;">💡 You can reply directly to this email to contact ${firstName}.</p>
            <p style="margin: 5px 0;">Sent at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        You can reply directly to this email to contact ${firstName}.
        Sent at: ${new Date().toLocaleString()}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
