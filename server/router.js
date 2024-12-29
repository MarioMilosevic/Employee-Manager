import { Router } from "express";

const router = Router();

router.get("/employee", (req, res) => {
    res.json({message:'mario'})

  // app.post("/api/data", (req, res) => {
  //   const receivedData = req.body;
  //   console.log("data received", receivedData);
  //   res.status(200).json({ message: "Data received successfully" });
  // });
});
router.post('/employee:id', (req, res) => {
    res.json({message:'dje si'})
})
// router.post("/employee", (req, res) => {
//     const receivedData = req.body;
//     console.log('data received', receivedData)
//     res.status(200).json({message:"Data received successfully"})
// });
router.get("/employee:id", () => {});
router.put("/employee:id", () => {});
router.delete("/employee:id", () => {});


export default router