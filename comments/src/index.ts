import cors from "cors";
import express, { Application, Request, Response } from "express";

import { randomBytes } from "crypto";

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT = 4001;

type Comment = {
  id: string;
  content: string;
};

const commentsByPostId: Record<string, Comment[]> = {};

app.get("/posts/:id/comments", (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
