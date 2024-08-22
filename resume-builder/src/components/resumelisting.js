import React from "react";
import "../style/resumelisting.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function ResumeListing() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow mb-3">
        <div className="container ">
          <a className="navbar-brand" href="#">
            Resume Builder
          </a>
          <div>
            <a href={`http://localhost:3000/resumelisting/${id}/profile`}>
              <button className="btn btn-sm btn-dark">
                <i className="bi bi-person-circle" /> Profile
              </button>
            </a>

            <button className="btn btn-sm btn-danger">
              <i className="bi bi-box-arrow-left" /> Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container back-glass-login">
        <div className=" rounded shadow p-2 mt-4" style={{ minHeight: "80vh" }}>
          <div className="d-flex justify-content-between border-bottom">
            <h5>Resumes</h5>
            <div>
              <a
                href={`http://localhost:3000/resumelisting/${id}/createresume`}
                className="text-decoration-none"
              >
                <i className="bi bi-file-earmark-plus" /> Add New
              </a>
            </div>
          </div>
          <div
            className="text-center py-3 border rounded mt-3"
            style={{ backgroundColor: "rgba(236, 236, 236, 0.56)" }}
          >
            <i className="bi bi-file-text" /> No Resumes Available
          </div>
          <div className="d-flex flex-wrap">
            <div className="col-12 col-md-6 p-2">
              <div className="p-2 border rounded">
                <h5>Web Developer Consultant</h5>
                <p className="small  m-0" style={{ fontSize: 12 }}>
                  <i className="bi bi-clock-history" />
                  Last Updated 23 September, 2023 08:09 AM
                </p>
                <div className="d-flex gap-2 mt-1">
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-file-text" /> Open
                  </a>
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-pencil-square" /> Edit
                  </a>
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-trash2" /> Delete
                  </a>
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-share" /> Share
                  </a>
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-copy" /> Clone
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 p-2">
              <div className="p-2 border rounded">
                <h5>Web Developer Consultant</h5>
                <p className="small m-0" style={{ fontSize: 12 }}>
                  <i className="bi bi-clock-history" />
                  Last Updated 23 September, 2023 08:09 AM
                </p>
                <div className="d-flex gap-2 mt-1">
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-file-text" /> Open
                  </a>
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-pencil-square" /> Edit
                  </a>
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-trash2" /> Delete
                  </a>
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-share" /> Share
                  </a>
                  <a href="" className="text-decoration-none small">
                    <i className="bi bi-copy" /> Clone
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeListing;
