import Home from "./Pages/home/Home";
import TopBar from "./Components/topBar/TopBar";
import Single from "./Pages/Single/Single";
import Write from "./Components/Write/Write";
import Setting from "./Pages/Setting/Setting";
import Login from "./Pages/Login/Login";
import Register from "./Pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import axios from "axios";
axios.defaults.baseURL = "https://react-blog-api-ten.vercel.app";
function App() {
  const { user } = useContext(Context);
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={user ? <Home /> : <Login />} />

          <Route path="/register" element={user ? <Home /> : <Register />} />

          <Route path="/write" element={user ? <Write /> : <Register />} />

          <Route
            path="/setting/:userId"
            element={user ? <Setting /> : <Register />}
          />

          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
