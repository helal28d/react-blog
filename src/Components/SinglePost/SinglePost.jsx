import React, { useContext, useEffect, useState } from "react";
import "./SinglePost.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { baseURL } from "../../server";
export default function SinglePost() {
  const PF = baseURL + "/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const { user } = useContext(Context);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  const handleDelete = async () => {
    //delete need data{}
    try {
      await axios.delete(`${baseURL}/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handelUpdate = async () => {
    try {
      await axios.put(`${baseURL}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });

      setUpdateMode(false);
    } catch (error) {}
  };
  return (
    <div className="singlePost">
      <div className="wrapper">
        {post.photo && <img src={PF + post.photo} alt="" className="singImg" />}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singPostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singPostTitle">
            {title}

            {post.username === user?.username && (
              <div className="singPostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fas fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlepostAuth">
            Author :
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlepostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostUpdate" onClick={handelUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
