import cors from "cors";
import axios from "axios";
import express, { Application, Request, Response } from "express";

import { randomBytes } from "crypto";

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT = 4001;

type Comment = {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
};

const commentsByPostId: Record<string, Comment[]> = {};

app.get("/posts/:id/comments", (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      postId: req.params.id,
      commentId,
      content,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req: Request, res: Response) => {
  console.log(`Received Event: ${req.body.type}`);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, commentId, content, status } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === commentId);

    comment!.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        postId,
        commentId,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
