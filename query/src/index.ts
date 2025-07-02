import cors from "cors";
import axios from "axios";
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

function handleEvent(type: string, data: any) {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { postId, commentId, content, status } = data;

    const post = posts[postId];
    post.comments.push({ id: commentId, content, status });
  }

  if (type === "CommentUpdated") {
    const { postId, commentId, content, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === commentId);

    comment!.status = status;
    comment!.content = content;
  }
}

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("🚨 [Error] Axios failed to fetch events:", err.message);
    } else if (err instanceof Error) {
      console.error("🚨 [Error] Unexpected error:", err.message);
    } else {
      console.error("🚨 [Error] Non-error thrown:", err);
    }
  }
});
