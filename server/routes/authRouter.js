import { Router } from "express";
import findUser from "../database/read.js"
const router = Router();



//---------------------------------TO be changed to route with actual route ---------------------
router.get("/auth/user", async (req, res) => {
    const email = req.query.email ?? "dummy@mail.dk"
    const user = await findUser(email)
    res.send({ data: user})
})

export default router;