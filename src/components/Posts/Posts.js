import "./Posts.css";
import Post from "./Post/Post";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("http://localhost:3002/posts");
      setPosts(data);
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return <h3>No Posts Found</h3>;
  }

  return (
    <div className="posts">
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Posts;
