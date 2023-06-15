import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { context, server } from "./main";

function App() {
  const { setUser, setIsAuthenticated,setLoading,setRefresh } = useContext(context);
  useEffect(() => {
    
    axios
      .get(`${server}/users/me`, { withCredentials: true })
      .then((res) => {
        setLoading(true)
        setUser(res.data.user);
        setIsAuthenticated(true);
        setRefresh((prev) => !prev);
        setLoading(false);
        
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
