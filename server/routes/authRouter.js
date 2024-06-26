import { Router } from "express";
import login from "../util/loginUtil.js";
import { createUser } from "../database/create.js";
import { hashPassword, newPassword } from "../util/passwordUtil.js";
import { resetPasswordEmail, welcomeEmail } from "../util/resend.js";
import { updateUser } from "../database/update.js";
import authenticate from "../middleware/authMiddleware.js";
import { findUser } from "../database/read.js";

const router = Router();

router.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).send({ data: "Missing Email" });
  }

  if (!password) {
    res.status(400).send({ data: "Missing Password" });
  }
  try {
    let hashedPassword = await hashPassword(password);
    const newUser = await createUser(email, hashedPassword);
    req.session.user = {
      email: newUser.email,
    };
    await welcomeEmail(email);
    res.send({ data: "user created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ data: "Email already exists" });
    }
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send({ data: "Missing Email" });
  }

  if (!password) {
    return res.status(400).send({ data: "Missing Password" });
  }

  const user = await login(email, password);

  if (!user) {
    res.send({ data: "incorrect Email or Password" });
  } else {
    req.session.user = {
      email: user.email,
      username: user.username,
    };
    res.send({ data: true });
  }
});

router.post("/auth/logout", authenticate, (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send({ data: "Failed to Logout" });
      }
      res.clearCookie("connect.sid");
      res.send({ data: "Logout Succesful" });
    });
  } else {
    return res.status(400).send({ data: "No active session to destroy" });
  }
});

router.patch("/auth/changepassword", async (req, res) => {
  const { email } = req.body;
  const user = await findUser(email)
  if(!user){
   res.send({ data: "password reset requested" })
   return
  }
  const updateData = {};

  const password =  newPassword();
  let newHashedPassword = await hashPassword(password);

  updateData.password = newHashedPassword;
  updateData.passchange = true;

  try {
    await updateUser(email, updateData);
    await resetPasswordEmail(email, password);
  } catch (error) {
    return res.status(500).send({ data: "Internal Server Error" });
  }
  res.send({ data: "password reset requested" });
});

export default router;

