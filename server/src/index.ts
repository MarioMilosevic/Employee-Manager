import app from "./server";

const port = 3000;

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
