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
    return null;
  }
  const passCheck = await comparePassword(plainTextPassword, user);
  if (!passCheck) {
    return "Wrong Email or Password";
  } else {
    return user;
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
    const newUser = await createUser(email, hashedPassword);
    req.session.user = {
      email: newUser.email,
    };
    res.send({ data: "user created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ data: "Email already exists" });
    }
  }
});

/* ----------------------------login route here----------------------------------- */
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    console.log("no email");
    return res.status(400).send({ data: "Missing Email" });
  }

  if (!password) {
    console.log("no password");
    return res.status(400).send({ data: "Missing Password" });
  }

  const user = await login(email, password);

  if(!user) {
    res.send({ data: "incorrect Email or Password" });
  } else {
    req.session.user = {
      email: user.email,
      username: user.username,
      role: user.role
    };
    res.send({ data: true });
  }
});

router.post("/api/logout", (req, res) => {
  if(req.session){
  req.session.destroy((err) => {
    if (err) {
      res.send({ data: "Failed to Logout" });
    }
    res.clearCookie('connect.sid');
    res.send({ data: "Logout Succesful" });
  });
} else {
  return res.status(400).send({ data: "No active session to destroy" });
}
});

router.get("/auth/adminsonly", isAdmin, (req, res) => {
  res.send({ data: "you can only get in here if you are a admin" });
});

export default router;
