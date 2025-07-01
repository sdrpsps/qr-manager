import { Resend } from "resend";

import ResetPasswordTemplate from "@/emails/reset-password-template";
import SignInTemplate from "@/emails/sign-in-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  name: string;
  url: string;
}

export const sendSignInEmail = async ({
  to,
  subject,
  name,
  url,
}: SendEmailProps) => {
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

export const sendResetPasswordEmail = async ({
  to,
  subject,
  name,
  url,
}: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_SENDER_ADDRESS!,
    to,
    subject,
    react: ResetPasswordTemplate({
      name,
      verificationUrl: url,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
