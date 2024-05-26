import { Router } from "express";
import { createCard } from "../database/create.js";
import { deleteCard } from "../database/delete.js";
import { findAllCards, findCard } from "../database/read.js";
import { updateCard } from "../database/update.js";
const router = Router();

router.get("/api/cards", async (req, res) => {
  try {
    const cards = await findAllCards();
    res.send({ data: cards });
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

router.patch("/api/cards", async (req, res) => {
  const { name, manacost, type, rarity, set, ability, power, toughness } = req.body;
  const updateData = {
    name: name,
    manacost: manacost,
    type: type,
    rarity: rarity,
    set: set,
    ability: ability,
    power: power,
    toughness: toughness
  }
  try{
  await updateCard(name, updateData);
  res.send({ data: "card has been updated" })
  console.log("card has been updated")
  }catch (error) {
    res.send({ data: error.message })
  }
});

router.delete("/api/cards", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await deleteCard(name);
    if (result.deletedCount === 1) {
      res.send({ data: "Card Deleted Succesfully" });
    }
  } catch (error) {
    res.send({ data: error.message });
  }
});

export default router;
