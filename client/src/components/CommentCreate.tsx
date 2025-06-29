import axios from "axios";
import { useState } from "react";

import type { ChangeEvent, FormEvent } from "react";

type CommentCreateProps = {
  postId: string;
};

export default function CommentCreate({ postId }: CommentCreateProps) {
  const [comment, setComment] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });

    setComment("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
  }

  return (
    <>
      <h6>Create Comment</h6>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="comment">Comment</label>
          <input
            id="comment"
            type="text"
            className="form-control"
            value={comment}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
