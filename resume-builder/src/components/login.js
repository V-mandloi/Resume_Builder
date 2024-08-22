import React, { useState } from "react";
import axios from "axios";
import "../style/login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  // const [username, setUsername] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      console.log("Please enter Username, Email and Password!");
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:3000/login?email=${inputs.email}&password=${inputs.password}`
      );
      console.log(data);
      if (data.success) {
        console.log("enter login");
        console.log(data.id);
        window.location.href = `/resumelisting/${data.id}`;
      }
    } catch (error) {
      console.log(error);
    }
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-control"
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
