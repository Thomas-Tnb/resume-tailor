import "dotenv/config";
import express from "express";
import path from "path";
import generateRouter from "../app/api/generate";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API routes
app.use("/api/generate", generateRouter);

// In production, serve the built frontend from dist/
if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "..", "dist");
  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`ResumeTailor API server listening on http://localhost:${port}`);
});

