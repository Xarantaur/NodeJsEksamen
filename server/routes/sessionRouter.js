import { Router } from "express";
import authenticate from "../middleware/authMiddleware";

const router = Router();

router.get("/api/session", authenticate, (req, res) => {
  res.send({ data: { user: req.session.user } });
});

export default router;
