import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/features/authSlice";
import "../styles/SignIn.css";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { loginError } = useSelector((state) => state.auth);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
    if (!loginError) {
      setUser({
        email: "",
        password: "",
      });
      navigate("/");
    }
  };
  return (
    <div className="login-container">
      <div className="login-row">
        <div className="login-col">
          <form onSubmit={handleLogin}>
            <h2>Login User</h2>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                value={user.email}
                id="email"
                required
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                value={user.password}
                id="password"
                required
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            {loginError && <div className="error">{loginError}</div>}
            <div className="form-group">
              <button type="submit">Sign In</button>
            </div>
            <div className="form-group">
              <NavLink to="/register">Create Your Account</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
