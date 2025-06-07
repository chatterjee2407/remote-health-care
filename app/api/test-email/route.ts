import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'test@example.com', // Replace with your email
      subject: 'Test Email',
      html: '<p>This is a test email to verify Resend integration.</p>',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json({ success: false, error });
  }
}
