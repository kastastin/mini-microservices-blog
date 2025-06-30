import axios from "axios";
import { useState, useEffect } from "react";

type Comment = {
  id: string;
  content: string;
};

type CommentListProps = {
  postId: string;
};

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const res = await axios.get<Comment[]>(
        `http://localhost:4001/posts/${postId}/comments`,
      );

      setComments(res.data);
    }

    fetchComments();
  }, [postId]);

  return (
    <ul className="mb-3">
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
}
