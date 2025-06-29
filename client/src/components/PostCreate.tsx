import axios from "axios";
import { useState } from "react";

import type { FormEvent, ChangeEvent } from "react";

export default function PostCreate() {
  const [title, setTitle] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await axios.post("http://localhost:4000/posts", { title });

    setTitle("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
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
