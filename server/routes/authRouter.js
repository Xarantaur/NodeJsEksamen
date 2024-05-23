import { Router } from "express";
import findUser from "../database/read.js";
import createUser from "../database/create.js";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";
const router = Router();

/* ---------------------check isAdmin---------------------- */
function isAdmin(req, res, next) {
  if (req.session.user.role === "admin") {
    next();
  } else {
    console.log(`${req.session.user.email} is not an admin`);
    res.redirect("http://localhost:8080/");
  }
}

/* --------------------------------login functionality---------------------------- */
async function login(email, plainTextPassword) {
  const user = await findUser(email);

  if (!user) {
    return "invalid user";
  }
  comparePassword(plainTextPassword, user);
  if (!comparePassword) {
    console.log("Incorrect Email or password");
  } else {
    console.log("auth success");
    return true;
  }
}
/* -------------------------------signup route here-------------------------------- */
router.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).send({ data: "Missing Email" });
  }

  if (!password) {
    res.status(400).send({ data: "Missing Password" });
  }
  try {
    let hashedPassword = await hashPassword(password);
    await createUser(email, hashedPassword);
    res.send({ data: "user created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).send({ data: "Email already exists" });
    }
  }
});

/* ----------------------------login route here----------------------------------- */
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).send({ data: "Missing Email" });
  }

  if (!password) {
    res.status(400).send({ data: "Missing Password" });
  }

  const result = await login(email, password);
  if (result) {
    res.send({ data: result });
  }
});

router.get("/auth/adminsonly", isAdmin, (req, res) => {
  res.send({ data: "you can only get in here if you are a admin" });
});

export default router;
