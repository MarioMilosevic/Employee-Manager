import { Router } from "express";

const router = Router();

router.get("/employee", (req, res) => {
  res.json({message:"mario mekbuk pro 14"})
});
router.post("/employee", () => {});
router.get("/employee:id", () => {});
router.put("/employee:id", () => {});
router.delete("/employee:id", () => {});

export default router;
