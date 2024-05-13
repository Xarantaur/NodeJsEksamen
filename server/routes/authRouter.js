import { Router } from "express";
const router = Router();

function isUser(req, res, next) {

}
//---------------------------------TO be changed to route with actual route ---------------------


router.get("/auth/somwhere", (req, res) => {
    res.send({ data: "this route is to be tested for auth purposes"})
})

export default router;