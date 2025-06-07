import { Resend } from 'resend';
import { NextResponse } from 'next/server';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json(
        { success: false, error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log('Received request body:', body);

    const { to, subject, description, link, dateTime } = body;

    if (!to || !subject || !description || !link || !dateTime) {
      console.error('Missing fields:', { to, subject, description, link, dateTime });
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Attempting to send email to:', to);
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use the verified domain from Resend
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Meeting Confirmation</h2>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Date & Time:</strong> ${new Date(dateTime).toLocaleString()}</p>
          <p><strong>Meeting Link:</strong> <a href="${link}" style="color: #007bff;">${link}</a></p>
          <br />
          <p style="color: #666;">Thank you for using our service!</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in email route:', error);
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
