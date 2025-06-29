import axios from "axios";
import { useState, useEffect } from "react";

import CommentCreate from "@/components/CommentCreate";

type Post = {
  id: string;
  title: string;
};

type Posts = Record<string, Post>;

export default function PostList() {
  const [posts, setPosts] = useState<Posts>({});

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get<Posts>("http://localhost:4000/posts");

      setPosts(res.data);
    }

    fetchPosts();
  }, []);

  return (
    <ul className="list-group d-flex flex-row flex-wrap justify-content-between gap-2">
      {Object.values(posts).map((post) => (
        <li
          key={post.id}
          className="card"
          style={{ width: "49%", padding: "20px" }}
        >
          <h3 className="mb-0">{post.title}</h3>
          <hr />
          <CommentCreate postId={post.id} />
        </li>
      ))}
    </ul>
  );
}
