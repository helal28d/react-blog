import React, { useContext, useState } from "react";
import "./Write.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { baseURL } from "../../server";
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      console.log(file.name);

      try {
        await axios
          .post(baseURL + "/upload", formData)
          .then((response) => {
            console.log(response);
            newPost.photo = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post(baseURL + "/posts", newPost);
      console.log("post created success");

      window.location.replace("/post/" + res.data._id); //go to the new post
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write">
      {file && (
        <img alt="" src={URL.createObjectURL(file)} className="writeImg" />
      )}

      <form className="writeForm " onSubmit={handleSubmit}>
        <div className="writeFormGrouop">
          <label htmlFor="fileInput">
            <i className="writeIcon fa fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            autoFocus={true}
            className="writeInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGrouop">
          <textarea
            type="text"
            placeholder="Write your story..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
