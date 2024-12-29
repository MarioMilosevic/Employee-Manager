import express from "express";
import router from "./router.js";
import cors from "cors";
const app = express();
// const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

// app.post("/api/data", (req, res) => {
//   const receivedData = req.body;
//   console.log("data received", receivedData);
//   res.status(200).json({ message: "Data received successfully" });
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

export default app
