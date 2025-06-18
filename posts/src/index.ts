import { randomBytes } from "crypto";
import express, { Application, Request, Response } from "express";

const app: Application = express();
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

app.post("/posts", (req: Request, res: Response) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
