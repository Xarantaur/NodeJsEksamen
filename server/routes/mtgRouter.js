import { Router } from "express";
import { createCard } from "../database/create.js";
import { deleteCard } from "../database/delete.js";
import { findAllCards, findCard } from "../database/read.js";
import { updateCard } from "../database/update.js";
const router = Router();

router.get("/api/mtg", async (req, res) => {
  try {
    const cards = await findAllCards();
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route to get a single card by name
router.get("/api/mtg/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const card = await findCard(name);
    if (card) {
      res.status(200).send(card);
    } else {
      res.status(404).send({ message: "Card not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route to create a new card
router.post("/api/mtg", async (req, res) => {
  try {
    const { name, manacost, type, rarity, set, ability, power, toughness } = req.body;
    const newCard = await createCard(name, manacost, type, rarity, set, ability, power, toughness);
    res.status(201).send(newCard);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route to update an existing card by name
router.patch("/api/mtg/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const updateData = req.body;
    const updatedCard = await updateCard(name, updateData);
    if (updatedCard.modifiedCount > 0) {
      res.status(200).send(updatedCard);
    } else {
      res.status(404).send({ message: "Card not found or no changes made" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route to delete a card by name
router.delete("/api/mtg/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const deletedCard = await deleteCard(name);
    if (deletedCard.deletedCount > 0) {
      res.status(200).send({ message: "Card deleted" });
    } else {
      res.status(404).send({ message: "Card not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
