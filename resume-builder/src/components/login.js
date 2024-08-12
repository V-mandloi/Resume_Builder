import React, { useState } from "react";
import axios from "axios";
import "../style/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    axios
      .get("http://localhost:3000/product", { email, password })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card back-glass-login " style={{ maxWidth: "600px" }}>
        <div className="card-body ">
          <b className="card-text">
            <h4>Login to your account</h4>
          </b>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                required
                className="form-control form-input-style"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary btn-block mb-3"
            >
              Login
            </button>
          </form>
          <div className="links">
            <a
              href="forgetPassword"
              className="text-muted links-color mr-3 text-decoration-none"
            >
              Forgot Password?
            </a>
            <a
              href="http://localhost:3000/register"
              className="text-muted links-color mr-3 text-decoration-none"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
