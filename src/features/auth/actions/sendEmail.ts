import { Resend } from "resend";

import ForgetPasswordTemplate from "@/emails/forgot-password-template";
import SignInTemplate from "@/emails/sign-in-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  name: string;
  otp: string;
}

export const sendSignInEmail = async ({
  to,
  subject,
  name,
  otp,
}: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_SENDER_ADDRESS!,
    to,
    subject,
    react: SignInTemplate({
      name,
      otp,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const sendForgetPasswordEmail = async ({
  to,
  subject,
  name,
  otp,
}: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_SENDER_ADDRESS!,
    to,
    subject,
    react: ForgetPasswordTemplate({
      name,
      otp,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
