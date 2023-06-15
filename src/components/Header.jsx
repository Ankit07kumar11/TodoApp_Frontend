import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading,setRefresh} =
    useContext(context);

  const logoutHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>

      <article>
        <Link to={"/"}>Home</Link>
        <Link to={isAuthenticated?"/profile":"/login"}>Profile</Link>

        {isAuthenticated ? (
          <button disabled={loading} className="btn" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
