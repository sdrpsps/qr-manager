import { Resend } from "resend";

import SignInTemplate from "@/emails/sign-in-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  name: string;
  url: string;
}

export const sendEmail = async ({ to, subject, name, url }: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_SENDER_ADDRESS!,
    to,
    subject,
    react: SignInTemplate({
      name,
      verificationUrl: url,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
