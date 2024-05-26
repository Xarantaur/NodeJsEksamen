
import { Router } from "express";
import { createCard } from "../database/create.js";
import { deleteCard } from "../database/delete.js";
import { findAllCards, findCard } from "../database/read.js";
import { updateCard } from "../database/update.js";
const router = Router();

router.get("/api/cards", async (req, res) => {
  try {
    const cards = await findAllCards();
    res.send({ data: cards})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/api/cards", async (req, res) => {
  const { name, manacost, type, rarity, set, ability, power, toughness } = req.body;
  try {
    await createCard(name, manacost, type, rarity, set, ability, power, toughness);
    res.send({ data: "Card created Succesfully" });
  } catch (error) {
    res.send({ data: error.message });
  }
});

router.patch("/api/cards", (req, res) => {
  const {  name, manacost, type, rarity, set, ability, power, toughness } = req.body;
  const updateData = {};

    
});

router.delete("/api/cards", async (req, res) => {
  const { name } = req.body;
  try{
    await deleteCard(name)
    res.send({ data: "Card Deleted Succesfully"})
  } catch(error){
    res.send({ data: error.message })
  }
});

export default router;
