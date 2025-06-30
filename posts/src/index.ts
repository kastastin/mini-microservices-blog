import cors from "cors";
import axios from "axios";
import express, { Application, Request, Response } from "express";

import { randomBytes } from "crypto";

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

type Post = {
  id: string;
  title: string;
};

const posts: Record<string, Post> = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/posts", async (req: Request, res: Response) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req: Request, res: Response) => {
  console.log(`Received Event: ${req.body.type}`);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
