import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APN_KEY);

export async function welcomeEmail(email) {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "resendthismail@gmail.com",
    subject: "Hey you!",
    html: "welcome to Lars og Lasse's Eksamens projekt",
  });
}

export async function resetPasswordEmail(email, password) {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "resendthismail@gmail.com",
    subject: "resetPassword",
    html: `${email} has requested a password reset.
  the new password is: ${password}`,
  });
}
