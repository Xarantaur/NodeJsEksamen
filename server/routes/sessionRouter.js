import { Router } from "express";

const router = Router();

/* --------- skal renames og implementeres på all auth routes */
function doorman(req, res, next) {
  if (!req.session.user) {
    console.log("ingen aktiv session"); // husk at slette
  } else {
    next();
  }
}

router.get("/api/session", (req, res) => {
  console.log("reqsessiosn before");
  if (req.session.user) {
    console.log("reqsession");
    res.send({ data: { user: req.session.user } });
  }
});

export default router;
