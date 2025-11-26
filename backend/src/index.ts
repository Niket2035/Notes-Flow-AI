import app from "./app";
import uploadvideoRoute from "./routes/uploadvideoRoute";
import webhookRoute from "./routes/webhookRoute";
import lectureRoute from "./routes/lectureRoute";

const PORT = process.env.PORT || 5000;

app.use(uploadvideoRoute);
app.use(webhookRoute);
app.use(lectureRoute);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
