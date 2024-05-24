import { Router } from "express";

const router = Router();

function doorman(req, res, next) {
    if (!req.session.user) {
      console.log("ingen aktiv session"); // husk at slette
      res.redirect("http://localhost:8080/"); // skal omdirigere til login page.
    } else {
      next();
    }
  }

router.get("/api/session", (req, res) => {
  res.send({ data:  { user: req.session.user || null } })
});

  export default router;
  