import { Router } from "express";
const router = Router();

function doorman(req, res, next) {
    if (!req.session.user) {
      console.log("ingen aktiv session"); // husk at slette
      res.redirect("http://localhost:8080/"); // skal omdirigere til login page.
    } else {
      console.log("du bliver omdirigeret"); // hust at slette
      next();
    }
  }

router.get("/auth/user", async (req, res) => {
    const email = req.query.user /* ?? "dummy@mail.dk"; */
    if (email) {
      req.session.user = {
        email: email,
        role: "user",
      };
      res.send({ Message: `${req.session.user.email} is stored in the session as a ${req.session.user.role}` });
    }
  });

router.get("/auth/admin", async (req, res) => {
    const email = req.query.user /* ?? "dummy@mail.dk"; */
    if (email) {
      req.session.user = {
        email: email,
        role: "admin",
      };
      res.send({ Message: `${req.session.user.email} is stored in the session as a ${req.session.user.role}` });
    }
  });
  
  router.get("/auth/session", doorman, (req, res) => {
    res.send({ email: req.session.user.email, user: req.session.user, admin: req.isAdmin });
  });

  router.get("/auth/getinhere", doorman, (req, res) => {
    res.send({ data: "you can only get in here if there is a session active"})
  })
  
  export default router;
  