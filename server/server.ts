import app from "./app";

const port = 3000;

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
