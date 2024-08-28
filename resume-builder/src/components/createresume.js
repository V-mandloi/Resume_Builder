import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateResume() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    number: "",
    DOB: "",
    gender: "",
    religion: "",
    nationality: "",
    maritalStatus: "",
    hobbies: "",
    language: "",
    address: "",
    objective: "",
    experiences: [],
    education: [],
    skills: [],
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: value,
      },
    }));
  };

  const handleAddExperience = () => {
    setInputs((prevState) => ({
      ...prevState,
      experiences: [...prevState.experiences, prevState.experienceInputs],
      experienceInputs: {},
    }));
  };

  const handleAddEducation = () => {
    setInputs((prevState) => ({
      ...prevState,
      education: [...prevState.education, prevState.educationInputs],
      educationInputs: {},
    }));
  };

  const handleAddSkill = () => {
    setInputs((prevState) => ({
      ...prevState,
      skills: [...prevState.skills, prevState.skillsInputs],
      skillsInputs: {},
    }));
  };

  const handleSubmit = async (e) => {
    console.log("enter");
    e.preventDefault();

    const dataToSubmit = {
      ...inputs,
      experiences: inputs.experiences || [],
      education: inputs.education || [],
      skills: inputs.skills || [],
    };

    console.log("Data to submit:", dataToSubmit);
    // const { id } = req.params;

    try {
      const { data } = await axios.post(
        `http://localhost:3000/resumelisting/${id}/resume`, // Make sure this matches your server route
        dataToSubmit
      );

      if (data.success) {
        window.location.href = `/resumelisting/${id}`;
      } else {
        console.log("data was not success");
      }
    } catch (error) {
      if (error.response) {
        // console.error("Error response:", error.response);
        // console.error("Error data:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const { id } = useParams();

  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">
            Resume Builder
          </a>
          <div>
            <a href={`http://localhost:3000/resumelisting/${id}/profile`}>
              <button className="btn btn-sm btn-dark">
                <i className="bi bi-person-circle" /> My Profile
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
            <h5>Create Resume</h5>
            <div>
              <a
                href={`http://localhost:3000/resumelisting/${id}`}
                className="text-decoration-none"
              >
                <i className="bi bi-arrow-left-circle" /> Back
              </a>
            </div>
          </div>
          <div>
            <form className="row g-3 p-3" onSubmit={handleSubmit}>
              <h5 className="mt-3 ">
                <i className="bi bi-person-badge" /> Personal Information
              </h5>
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Dev Ninja"
                  className="form-control"
                  value={inputs.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="dev@abc.com"
                  className="form-control"
                  value={inputs.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile No</label>
                <input
                  type="number"
                  min={1111111111}
                  placeholder={9569569569}
                  max={9999999999}
                  className="form-control"
                  value={inputs.number}
                  onChange={handleChange}
                  name="number"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date Of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={inputs.DOB}
                  onChange={handleChange}
                  name="DOB"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  value={inputs.gender}
                  onChange={handleChange}
                  name="gender"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Transgender</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Religion</label>
                <select
                  className="form-select"
                  value={inputs.religion}
                  onChange={handleChange}
                  name="religion"
                >
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Sikh</option>
                  <option>Christian</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Nationality</label>
                <select
                  className="form-select"
                  value={inputs.nationality}
                  onChange={handleChange}
                  name="nationality"
                >
                  <option>Indian</option>
                  <option>Non Indian</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Marital Status</label>
                <select
                  className="form-select"
                  value={inputs.maritalStatus}
                  onChange={handleChange}
                  name="maritalStatus"
                >
                  <option>Married</option>
                  <option>Single</option>
                  <option>Divorced</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Hobbies</label>
                <input
                  type="text"
                  placeholder="Reading Books, Watching Movies"
                  className="form-control"
                  value={inputs.hobbies}
                  onChange={handleChange}
                  name="hobbies"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Languages Known</label>
                <input
                  type="text"
                  placeholder="Hindi,English"
                  className="form-control"
                  value={inputs.language}
                  onChange={handleChange}
                  name="language"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  value={inputs.address}
                  onChange={handleChange}
                  name="address"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Objective
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="objective"
                  placeholder="1234 Main St"
                  value={inputs.objective}
                  onChange={handleChange}
                  name="objective"
                />
              </div>

              <hr />
              <div className="d-flex justify-content-between">
                <h5 className=" ">
                  <i className="bi bi-briefcase" /> Experience
                </h5>
                <div>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="text-decoration-none"
                  >
                    <i className="bi bi-file-earmark-plus" /> Add New
                  </button>
                </div>
              </div>
              <div>
                {inputs.experiences.map((experience, index) => {
                  if (!experience) return null;
                  return (
                    <div
                      key={index}
                      style={{
                        border: "1px solid white",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <h2>Experience : {experience.company}</h2>
                      <ul>
                        {Object.keys(experience).map((key) => (
                          <li key={key}>
                            <strong>{key}:</strong> {experience[key]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className="col-md-6">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  placeholder="Infotech Services"
                  className="form-control"
                  value={inputs.experienceInputs?.company || ""}
                  onChange={(e) => handleNestedChange(e, "experienceInputs")}
                  name="company"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  placeholder="Web Developer"
                  className="form-control"
                  value={inputs.experienceInputs?.position || ""}
                  onChange={(e) => handleNestedChange(e, "experienceInputs")}
                  name="position"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">From</label>
                <input
                  type="date"
                  placeholder="5 years"
                  className="form-control"
                  value={inputs.experienceInputs?.from || ""}
                  onChange={(e) => handleNestedChange(e, "experienceInputs")}
                  name="from"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">To</label>
                <input
                  type="date"
                  placeholder="5 years"
                  className="form-control"
                  value={inputs.experienceInputs?.to || ""}
                  onChange={(e) => handleNestedChange(e, "experienceInputs")}
                  name="to"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  placeholder="5 years"
                  className="form-control"
                  value={inputs.experienceInputs?.experience || ""}
                  onChange={(e) => handleNestedChange(e, "experienceInputs")}
                  name="experience"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Proficiency</label>
                <select
                  className="form-select"
                  value={inputs.experienceInputs?.experienceType || ""}
                  onChange={(e) => handleNestedChange(e, "experienceInputs")}
                  name="experienceType"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>

              <hr />
              <div className="d-flex justify-content-between">
                <h5 className=" ">
                  <i className="bi bi-book" /> Education
                </h5>
                <div>
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="text-decoration-none"
                  >
                    <i className="bi bi-file-earmark-plus" /> Add New
                  </button>
                </div>
              </div>
              <div>
                {inputs.education.map((education, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid white",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <h2>Education : {education.institute}</h2>
                    <ul>
                      {Object.keys(education).map((key) => (
                        <li key={key}>
                          <strong>{key}:</strong> {education[key]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <label className="form-label">Institute</label>
                <input
                  type="text"
                  placeholder="ABC Institute"
                  className="form-control"
                  value={inputs.educationInputs?.institute || ""}
                  onChange={(e) => handleNestedChange(e, "educationInputs")}
                  name="institute"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Proficiency</label>
                <select
                  className="form-select"
                  value={inputs.educationInputs?.educationType || ""}
                  onChange={(e) => handleNestedChange(e, "educationInputs")}
                  name="educationType"
                >
                  <option>Select</option>
                  <option>10th</option>
                  <option>12th</option>
                  <option>Diploma</option>
                  <option>Graduation</option>
                  <option>Post Graduation</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Qualification In</label>
                <input
                  type="text"
                  placeholder="B.Tech"
                  className="form-control"
                  value={inputs.educationInputs?.qualification || ""}
                  onChange={(e) => handleNestedChange(e, "educationInputs")}
                  name="qualification"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Year of Passing</label>
                <input
                  type="text"
                  placeholder="2020"
                  className="form-control"
                  value={inputs.educationInputs?.yearOfPassing || ""}
                  onChange={(e) => handleNestedChange(e, "educationInputs")}
                  name="yearOfPassing"
                />
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h5 className=" ">
                  <i className="bi bi-stars" /> Skills
                </h5>
                <div>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="text-decoration-none"
                  >
                    <i className="bi bi-file-earmark-plus" /> Add New
                  </button>
                </div>
              </div>
              <div>
                {inputs.skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid white",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <h2>Skill : {skill.name}</h2>
                    <ul>
                      {Object.keys(skill).map((key) => (
                        <li key={key}>
                          <strong>{key}:</strong> {skill[key]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <label className="form-label">Skill Name</label>
                <input
                  type="text"
                  placeholder="JavaScript"
                  className="form-control"
                  value={inputs.skillsInputs?.name || ""}
                  onChange={(e) => handleNestedChange(e, "skillsInputs")}
                  name="name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Proficiency</label>
                <select
                  className="form-select"
                  value={inputs.skillsInputs?.proficiency || ""}
                  onChange={(e) => handleNestedChange(e, "skillsInputs")}
                  name="proficiency"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-file-earmark-lock" /> Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;
