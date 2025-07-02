import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT = 4002;

type Comment = {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
};

type Post = {
  id: string;
  title: string;
  comments: Comment[];
};

type Posts = Record<string, Post>;

const posts: Posts = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { postId, commentId, content, status } = data;

    const post = posts[postId];
    post.comments.push({ id: commentId, content, status });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
