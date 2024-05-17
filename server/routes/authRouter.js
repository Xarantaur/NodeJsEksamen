import { Router } from "express";
import findUser from "../database/read.js"
const router = Router();


function doorman(req, res, next) {
    if(!req.session.email){
        res.redirect("http://localhost:8080/")
    }else {
        console.log("du bliver omdirigeret")
        next();
    }
}


//---------------------------------TO be changed to route with actual route ---------------------
router.get("/auth/user", async (req, res) => {
    const email = req.query.email ?? "dummy@mail.dk"
    if(email){
        req.session.email = email;
        res.send({Message: `${email} is stored in the session`})
    } 
   /*  const user = await findUser(email)
    res.send({ data: user}) */
})

router.get("/auth/session", doorman, (req, res) => {
    res.send({ email: req.session.email})
})



export default router;