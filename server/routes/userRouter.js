import { Router } from "express";
import { updateUser } from "../database/update.js";
import { deleteUser } from "../database/delete.js";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";

const router = Router();

router.patch("/api/users", async (req, res) => {
  const { email } = req.session.user;
  const { username, age, password } = req.body;
  const updateData = {};

  if (username !== undefined) {
    updateData.username = username;
  }

  if (age !== undefined) {
    updateData.age = age;
  }

  if (password !== undefined) {
    try {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    } catch (error) {
      return res.status(500).send({ data: "Error hashing password" });
    }
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).send({ data: "No valid fields provided for update" });
  }

  try {
    await updateUser(email, updateData);
    if (username) req.session.user.username = username;
    console.log("userRouter updated session info: " + req.session.user);
    return res.send({ data: "User information updated" });
  } catch (error) {
    console.log("error");
    return res.status(500).send({ data: "Internal Server Error" });
  }
});

router.delete("/api/users/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send({ data: "Missing Email" });
  }

  const result = await deleteUser(email);
  if (result.deletedCount === 0) {
    return res.status(404).send({ data: "No User with that Email not found" });
  }
  res.send({ data: `${email} Deleted Successfully` });
});

export default router;
