import axios from "axios";
import "./PostDetail.css";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const PostDetail = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [post, setPost] = useState([]);
  const { postID } = useParams();

  const imgSrc =
    post.cover ||
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:3002/posts/${postID}`);
      setPost(data);
    };
    fetchPost();
    // eslint-disable-next-line
  }, []);
  const date = (dat) => {
    return dat.slice(0, dat.indexOf("T"));
  };
  return (
    <Fragment>
      {post.length === 0 ? (
        <span>Loading</span>
      ) : (
        <div className="post-page">
          <h1>{post.title}</h1>
          <time style={{ fontSize: "12px" }}>{date(post.createdAt)}</time>
          <div className="author">
            by @
            <Link to={`/profile/${post.author._id}`}>
              {post.author.userName}
            </Link>
          </div>

          {currentUser._id === post.author._id && (
            <div className="edit-row">
              <Link className="edit-btn" to={`/edit/${post._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit this post
              </Link>
            </div>
          )}
          <div className="image">
            <img src={imgSrc} alt="" />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      )}
    </Fragment>
  );
};

export default PostDetail;
