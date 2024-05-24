  import { Router } from "express";
  import updateUser from "../database/update.js"
  import deleteUser  from "../database/delete.js";

  const router = Router();

  router.patch("/api/users", async (req, res) => {
    const { email } = req.session.user
    const { username, age } = req.body;
    if (!username) {
      res.status(400).send({ data: "Missing Username" });
    }

    if (!age) {
      res.status(400).send({ data: "Missing Age" });
    }

    await updateUser(email, username, age)
    req.session.user.username = username;

    console.log(req.session.user)
    res.send({ data: "User information updated" });
  });

  router.delete("/api/users/", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).send({ data: "Missing Email" });
    }

    const result = await deleteUser(email);
    if (result.deletedCount === 0){
      return res.status(404).send({data: "No User with that Email not found"})
    }
      res.send({ data: `${email} Deleted Successfully` });
  });

  export default router