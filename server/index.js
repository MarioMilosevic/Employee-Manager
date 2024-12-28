import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors())

// app.use(express.json());


app.post("/api/data", (req, res) => {
  const receivedData = req.body;
  console.log("data received", receivedData);
  res.status(200).json({message:"Data received successfully"})
}); 
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// app.get("/api/data", (req, res) => {
//   const receivedData = req.body;
//   console.log(receivedData);
//   // res.status(200).json({message:"Data received successfully"})
//   // res.sendStatus(200)
//   // res.status(200)
//   // res.json() vjerovanto ovo
//   // req.body
//   res.send("Hello world");
// });
