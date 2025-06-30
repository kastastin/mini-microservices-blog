import axios from "axios";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());

const PORT = 4005;

app.post("/events", async (req: Request, res: Response) => {
  const event = req.body;

  const services = [
    "http://localhost:4000/events", // posts
    "http://localhost:4001/events", // comments
    "http://localhost:4002/events", // queries
  ];

  await Promise.all(
    services.map(async (url) => {
      try {
        await axios.post(url, event);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(
            `🚨 [Error] Failed to send event to ${url}: ${err.message}`,
          );
        } else {
          console.error(
            `🚨 [Error] Unknown error when sending event to ${url}`,
          );
        }
      }
    }),
  );

  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
