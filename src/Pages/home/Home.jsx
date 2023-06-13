import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../Components/header/Header";
import Posts from "../../Components/Posts/Posts";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://react-blog-api-ten.vercel.app/api/posts" + search
      );
      setPosts(res.data);
      console.log(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
