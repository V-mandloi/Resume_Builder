import "../style/register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterPage() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/product", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
        console.log("sucssess");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card back-glass-login custom-card-width">
        <div className="card-body">
          <h2 className="card-text">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="form-control form-input-style"
              />
            </div>
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
              Register
            </button>
          </form>
          <div className="links ">
            <a href="#" className="text-muted mr-3 links-color"></a>
            <a
              href="http://localhost:3000/login"
              className="text-muted mr-3 links-color text-decoration-none"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
