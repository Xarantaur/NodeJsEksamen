import { findCard } from "../database/read";


router.get("/api/mtg", (req, res) => {
    const { name } = req.body;
    const card = findCard(name)
    if(!card) {
        console.log("no card found")
    }else{
        toast.succes("")
    }
  res.send({ data: "stuff" });
});


router.post("/api/mtg", (req, res) => {
  res.send({ data: "stuff" });
});

router.patch("/api/mtg", (req, res) => {
  res.send({ data: "stuff" });
});

router.delete("/api/mtg", (req, res) => {
  res.send({ data: "stuff" });
});
