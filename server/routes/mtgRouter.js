import { Router } from "express";
import { createCard } from "../database/create.js";
import { deleteCard } from "../database/delete.js";
import { findAllCards } from "../database/read.js";
import { updateCard } from "../database/update.js";
const router = Router();

router.get("/api/cards", async (req, res) => {
  try {
    const result = await findAllCards();
    res.send({ data: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/api/cards", async (req, res) => {
  const card = req.body;
  try {
    await createCard(card);
    res.send({ data: "Card created Succesfully" });
  } catch (error) {
    res.send({ data: error.message });
  }
});

/* update kort navn virker ikke umiddelbart, check svelte, updater kortene baseret på id istedet for navn */
router.patch("/api/cards", async (req, res) => {
  const updateData = req.body;
  try {
    await updateCard(updateData.name, updateData);
    res.send({ data: "card has been updated" });
  } catch (error) {
    res.send({ data: error.message });
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
