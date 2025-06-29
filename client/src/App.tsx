import PostList from "@/components/PostList";
import PostCreate from "@/components/PostCreate";

export default function App() {
  return (
    <div className="container">
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}
