import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/Editor/Editor";
import "./CreateNew.css";

const CreateNew = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const imageUpload = (pic) => {
    setLoading(true);
    if (
      (!(pic.type === undefined) && pic.type === "image/jpeg") ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-engine");
      data.append("cloud_name", "dh0mlxryk");
      fetch("https://api.cloudinary.com/v1_1/dh0mlxryk/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setFile(data.url.toString());
          setLoading(false);
          alert("uploaded");
        })
        .catch((error) => {
          console.log("Error : ", error.message);
        });
    } else {
      alert("Please select an image");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // if (file === undefined) {
    //   alert("Please upload an image");
    //   return;
    // }

    const formData = {
      title,
      summary,
      file,
      content,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      // const { data } =
      await axios.post(
        "https://friendly-tan-buffalo.cyclic.app/post",
        formData,
        config
      );
      // console.log(data);
      alert("Post created");
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        <input
          type="file"
          onChange={(event) => imageUpload(event.target.files[0])}
        />
        <Editor value={content} onChange={setContent} />
        {!loading ? (
          <button style={{ marginTop: "5px", marginBottom: "16px" }}>
            Create post
          </button>
        ) : (
          <button style={{ marginTop: "5px", marginBottom: "16px" }}>
            Uploading, please wait
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateNew;
