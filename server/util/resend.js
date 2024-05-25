import "dotenv/config"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_APN_KEY);

export async function welcomeEmail(email) {
  console.log("sending email")
  await resend.emails.send({
  from: "Acme <onboarding@resend.dev>",
  to: [email],
  subject: "Hey you!",
  html: "welcome to Lars og Lasse's Eksamens projekt",
});
}

export async function resetPasswordEmail(email) {
  await resend.emails.send({
  from: "Acme <onboarding@resend.dev>",
  to: [email],
  subject: "resetPassword",
  html: "",
});
}