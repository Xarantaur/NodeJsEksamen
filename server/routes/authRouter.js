import { Router } from "express";
import findUser from "../database/read.js";
/* import createUser from "../database/create.js" */
import { comparePassword } from "../util/passwordUtil.js";
const router = Router();

/* -----------------------Doorman for sessions--------------------------------- */
function doorman(req, res, next) {
  if (!req.session.user) {
    console.log("ingen aktiv session"); // husk at slette
    res.redirect("http://localhost:8080/"); // skal omdirigere til login page.
  } else {
    console.log("du bliver omdirigeret"); // hust at slette
    next();
  }
}

async function login(email, plainTextPassword) {
  const user = await findUser(email);

  if (!user) {
    return "invalid user";
  }
  /* -----------------------------------------husk at gøre det her pænt og håndter errors for toaster */
  /* const isSame = await bcrypt.compare(plainTextPassword, user.password); */
  comparePassword(plainTextPassword, user);
  if (!comparePassword) {
    console.log("Incorrect Email or password");
  } else {
    console.log("auth success");
    return true;
  }
}

/* ----------------------------login route here----------------------------------- */
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).send({ data: "Missing email " });
  }

  if (!password) {
    res.status(400).send({ data: "Missing password " });
  }

  const result = await login(email, password);
  if (result) {
    res.send({ data: true });
  }
});

//---------SESSION stuff :------------------------TO be changed to route with actual route --------------------- and remove dummy mail
router.get("/auth/user", async (req, res) => {
  const email = req.query.user ?? "dummy@mail.dk";
  if (email) {
    req.session.user = {
      email: email,
      role: "user",
    };
    res.send({ Message: `${req.session.user.email} is stored in the session as a ${req.session.user.role}` });
  }
});

router.get("/auth/session", doorman, (req, res) => {
  res.send({ email: req.session.user.email, user: req.session.user });
});

export default router;
