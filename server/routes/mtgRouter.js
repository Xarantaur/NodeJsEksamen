
import { findCard } from "../database/read";

import { Router } from "express";
import { createCard } from "../database/create.js";
import { deleteCard } from "../database/delete.js";
import { findAllCards, findCard } from "../database/read.js";
import { updateCard } from "../database/update.js";
const router = Router();

router.get("/api/cards", async (req, res) => {
  try {
    const cards = await findAllCards();
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.post("/api/cards", (req, res) => {
  res.send({ data: "stuff" });
});

router.patch("/api/cards", (req, res) => {
  res.send({ data: "stuff" });
});

router.delete("/api/cards", (req, res) => {
  res.send({ data: "stuff" });
});

export default router;
