import React from "react";
import "../style/forgotPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Forget() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card back-glass-login" style={{ maxWidth: "600px" }}>
        <div className="card-body ">
          <b className="card-text">
            <h4>Forgot your password</h4>
          </b>
          <form>
            <div className="form-group mb-4 mt-4">
              <label htmlFor="email">Email address</label>
              <input
                placeholder="Vikram34@gmail.com"
                type="email"
                id="email"
                required
                className="form-control form-input-style"
              />
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">
              <i className="bi bi-send" /> Send Verification Code
            </button>

            <div className="  d-flex justify-content-between my-3">
              <a
                href="http://localhost:3000/register"
                className="text-decoration-none"
              >
                Register
              </a>
              <a
                href="http://localhost:3000/login"
                className=" text-decoration-none"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forget;
