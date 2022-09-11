import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/features/authSlice";
import "../styles/SignIn.css";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const { registerError } = useSelector((state) => state.auth);
  console.log(registerError);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
    if (!registerError) {
      setUser({
        username: "",
        email: "",
        phone: "",
        password: "",
      });
      navigate("/login");
    }
  };
  return (
    <div className="login-container">
      <div className="login-row">
        <div className="login-col">
          <form onSubmit={handleSubmit}>
            <h2>Register User</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={user.username}
                id="username"
                required
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
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
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                value={user.phone}
                id="phone"
                required
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
            {registerError && <div className="error">{registerError}</div>}
            <div className="form-group sign-up">
              <button type="submit">Sign Up</button>
            </div>
            <div className="form-group sign-up">
              <NavLink to="/login">Already Have Account</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
