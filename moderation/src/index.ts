import axios from "axios";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());

const PORT = 4003;

app.post("/events", async (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("red") ? "rejected" : "approved";

    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          postId: data.postId,
          commentId: data.commentId,
          content: data.content,
          status,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          `🚨 [Moderation Error] Failed to emit CommentModerated: ${err.message}`,
        );
      } else {
        console.error(
          "🚨 [Moderation Error] Unknown error when sending CommentModerated event",
        );
      }
    }
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
