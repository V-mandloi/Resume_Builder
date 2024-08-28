import React, { useState, useEffect } from "react";
import "../style/resumelisting.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// axios
//   .get(`http://localhost:3000/resumelisting/${id}/getresume`)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

function ResumeListing() {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState([]);
  const [resumes, setResumes] = useState({});
  const navigate = useNavigate();

  // console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/resumelisting/${id}/getresume`)
      .then((response) => {
        const resumeSchema = response.data.resumeSchema;
        setResumeData(resumeSchema);
        fetchResumes(resumeSchema);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const fetchResumes = (resumeSchema) => {
    console.log("eenter fetchResumes");
    resumeSchema.forEach((resumeId) => {
      axios
        .get(`http://localhost:3000/resumelisting/${id}/resume/${resumeId}`)
        .then((response) => {
          setResumes((prevResumes) => ({
            ...prevResumes,
            [resumeId]: response.data,
          }));
          console.log(resumes);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const deleteResume = (resumeId) => {
    axios
      .delete(`http://localhost:3000/resumelisting/${id}/resume/${resumeId}`)
      .then((response) => {
        console.log(response.data);
        // Remove the resume from the state
        setResumes((prevResumes) => {
          delete prevResumes[resumeId];
          return { ...prevResumes };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log(resumeData);
  console.log(resumes);
  // const updatedAt = resumes[resumeId].updatedAt;

  const handleOpenResume = (resumeId) => {
    console.log(resumeId);
    console.log(id);
    navigate(`/resumelisting/${id}/resumeTemplate/${resumeId}`);

    // window.location.href = `/resumelisting/${id}/resumeTemplate/${resumeId}`;
  };

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
          {Object.keys(resumes).length === 0 && (
            <div
              className="text-center py-3 border rounded mt-3"
              style={{ backgroundColor: "rgba(236, 236, 236, 0.56)" }}
            >
              <span>
                <i className="bi bi-file-text" /> No Resumes Available
              </span>
            </div>
          )}
          <div className="d-flex flex-wrap mt-3">
            {Object.keys(resumes).map((resumeId, index) => (
              <div key={resumeId} className="col-12 col-md-6 p-2">
                <div className="p-2 border rounded">
                  <h5>{resumes[resumeId].name}</h5>
                  <p className="small  m-0" style={{ fontSize: 12 }}>
                    <i className="bi bi-clock-history" />
                    Last Updated{" "}
                    {new Date(
                      resumes[resumeId].updatedAt
                    ).toLocaleDateString()}{" "}
                    {new Date(resumes[resumeId].updatedAt).toLocaleTimeString()}
                  </p>
                  <div className="d-flex gap-2 mt-1">
                    <a
                      href=""
                      className="text-decoration-none small"
                      onClick={() => handleOpenResume(resumeId)}
                    >
                      <i className="bi bi-file-text" /> Open
                    </a>
                    <a href="" className="text-decoration-none small">
                      <i className="bi bi-pencil-square" /> Edit
                    </a>
                    <a
                      href={`http://localhost:3000/resumelisting/${id}/resume/${resumeId}`}
                      className="text-decoration-none small"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteResume(resumeId);
                      }}
                    >
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeListing;
