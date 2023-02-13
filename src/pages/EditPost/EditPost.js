import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../components/Editor/Editor";

const EditPost = () => {
  const { postID } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `https://friendly-tan-buffalo.cyclic.app/posts/${postID}`
        );
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
    // eslint-disable-next-line
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.put(
        `https://friendly-tan-buffalo.cyclic.app/posts/${postID}`,
        { title, summary, content },
        config
      );
      console.log(data);
      alert("Post Updated");
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <h6>Loading</h6>;
  }
  return (
    title !== "" && (
      <div className="">
        <form onSubmit={submitHandler} className="create_form">
          <input
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
          <Editor onChange={setContent} value={content} />
          <button style={{ marginTop: "5px" }}>Update post</button>
        </form>
      </div>
    )
  );
};

export default EditPost;
