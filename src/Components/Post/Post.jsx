import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
import { baseURL } from "../../server";
export default function Post({ post }) {
  const PF = baseURL + "/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((m) => (
            <span className="postCat" key={m._id}>
              {m.name}
            </span>
          ))}
        </div>
        <Link to={`${baseURL}/posts/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
