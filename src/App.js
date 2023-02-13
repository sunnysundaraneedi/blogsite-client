import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Posts from "./components/Posts/Posts";
import CreateNew from "./pages/CreateNew/CreateNew";
import EditPost from "./pages/EditPost/EditPost";
import Login from "./pages/Login/Login";
import PostDetail from "./pages/PostDetail/PostDetail";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  const { userLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userLoggedIn) {
      localStorage.removeItem("userInfo");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <main className="app">
      <NavBar />
      <Routes>
        <Route path="/posts">
          <Route index element={<Posts />} />
          <Route path=":postID" element={<PostDetail />} />
        </Route>
        <Route path="/edit/:postID" element={<EditPost />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="profile/:profileID"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateNew />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
