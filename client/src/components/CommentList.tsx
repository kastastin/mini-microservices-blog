type Comment = {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
};

type CommentListProps = {
  comments: Comment[];
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <ul className="mb-3">
      {comments.map((comment) => {
        let content;

        if (comment.status === "approved") content = comment.content;
        if (comment.status === "rejected") content = "Rejected comment";
        if (comment.status === "pending") content = "Awaiting moderation...";

        return <li key={comment.id}>{content}</li>;
      })}
    </ul>
  );
}
