import { Link, useNavigate } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const imgSrc =
    post.cover ||
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  const date = (dat) => {
    return dat.slice(0, dat.indexOf("T"));
  };

  const clickHandler = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div className="post">
      <img
        src={imgSrc}
        alt="pic of a chip"
        onClick={clickHandler}
        style={{ cursor: "pointer" }}
      />
      <div className="description">
        <h2>{post.title}</h2>
        <p className="info_text">
          <Link to={`/profile/${post.author._id}`} className="author">
            - {post.author.userName}
          </Link>
          <span>{date(post.createdAt)}</span>
        </p>
        <p>{post.summary}</p>
      </div>
    </div>
  );
};

export default Post;
