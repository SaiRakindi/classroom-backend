import express from "express";
import { classes } from "../db/schema/index.js";
import { db } from "../db/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const [createdClass] = await db
      .insert(classes)
      .values({
        ...req.body,
        inviteCode: Math.random().toString(36).substring(2, 9),
        schedules: [],
      })
      .returning({ id: classes.id });

    res.status(201).json({ data: createdClass });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
