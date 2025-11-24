import app from "./app";
import uploadvideoRoute from "./routes/uploadvideoRoute";

const PORT = process.env.PORT || 5000;

app.use(uploadvideoRoute);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
