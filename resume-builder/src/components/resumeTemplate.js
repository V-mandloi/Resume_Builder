import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../style/resumeTemplate.css";

function Resume() {
  const { id } = useParams();
  console.log(id);

  const [resumeData, setResumeData] = useState([]);
  const [resumes, setResumes] = useState({});

  useEffect(() => {
    if (id) {
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
    }
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

  return (
    <div className="page">
      <div className="subpage">
        {Object.keys(resumes).length > 0 && (
          <table className="w-100">
            <tbody>
              <tr>
                <td className="text-center fw-bold fs-4">Resume</td>
              </tr>
              <tr>
                <td></td>
                <td className="personal-info zsection">
                  <div className="fw-bold name">
                    {resumes[Object.keys(resumes)[0]].name}
                  </div>
                  <div>
                    Mobile :{" "}
                    <span className="mobile">
                      {resumes[Object.keys(resumes)[0]].number}
                    </span>
                  </div>
                  <div>
                    Email :{" "}
                    <span className="email">
                      {resumes[Object.keys(resumes)[0]].email}
                    </span>
                  </div>
                  <div>
                    Address :{" "}
                    <span className="address">
                      {resumes[Object.keys(resumes)[0]].address}
                    </span>
                  </div>
                  <hr />
                </td>
              </tr>

              <tr className="objective-section zsection">
                <td className="fw-bold align-top text-nowrap pr title">
                  Objective
                </td>
                <td className="pb-3 objective">
                  {resumes[Object.keys(resumes)[0]].objective}
                </td>
              </tr>
              {/* {personalInfo.experiences &&
              personalInfo.experiences.map((experience, index) => ( */}
              <tr className="experience-section zsection">
                <td className="fw-bold align-top text-nowrap pr title">
                  Experience
                </td>
                <td className="pb-3 experiences  key={index}">
                  {resumes[Object.keys(resumes)[0]].experiences.map(
                    (experience, index) => (
                      <div key={index} className="experience mb-2">
                        <div className="fw-bold">
                          {" "}
                          <span className="job-role">
                            {experience.company}
                          </span>{" "}
                          (
                          <span className="duration">
                            {experience.experience}
                          </span>{" "}
                          )
                        </div>
                        <div className="company">
                          {experience.experienceType}
                        </div>
                        <div>
                          <span className="working-from">
                            {new Date(experience.from).toLocaleDateString()}
                          </span>{" "}
                          –{" "}
                          <span className="working-to">
                            {" "}
                            {new Date(experience.to).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="work-description">
                          {/* Handling customers and fulfilling their needs */}
                          {experience.position}
                        </div>
                      </div>
                    )
                  )}
                </td>
              </tr>
              {/* ))} */}
              <tr className="education-section zsection">
                <td className="fw-bold align-top text-nowrap pr title">
                  Education
                </td>
                <td className="pb-3 educations">
                  {resumes[Object.keys(resumes)[0]].education.map(
                    (education, index) => (
                      <React.Fragment key={index}>
                        <div className="education mb-2">
                          <div className="fw-bold">
                            -{" "}
                            <span className="course">
                              Completed {education.educationType} Class (
                              {education.qualification})
                            </span>
                          </div>
                          <div className="institute">{education.institute}</div>
                          <div className="date">
                            Passed in {education.yearOfPassing}
                          </div>
                        </div>

                        {/* <div className="education mb-2">
                          <div className="fw-bold">
                            -{" "}
                            <span className="course">
                              Bachelor’s of Arts (Programme)
                            </span>
                          </div>
                          <div className="institute">
                            Delhi University(SOL), New Delhi
                          </div>
                          <div className="date">Currently Pursuing</div>
                        </div> */}
                      </React.Fragment>
                    )
                  )}
                </td>
              </tr>

              <tr className="skills-section zsection">
                <td className="fw-bold align-top text-nowrap pr title">
                  Skills
                </td>
                {resumes[Object.keys(resumes)[0]].skills.map(
                  (skills, index) => (
                    <React.Fragment key={index}>
                      <td className="pb-3 skills">
                        <div className="skill">
                          - {skills.name} - {skills.proficiency}
                        </div>
                      </td>
                    </React.Fragment>
                  )
                )}
              </tr>

              <tr className="personal-details-section zsection">
                <td className="fw-bold align-top text-nowrap pr title">
                  Personal Details
                </td>
                <td className="pb-3">
                  <table className="pd-table">
                    <tbody>
                      <tr>
                        <td>Date of Birth</td>
                        <td>
                          :{" "}
                          <span className="date-of-birth">
                            {" "}
                            {/* {resumes[Object.keys(resumes)[0]].DOB} */}
                            {new Date(
                              resumes[Object.keys(resumes)[0]].DOB
                            ).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>
                          :{" "}
                          <span className="gender">
                            {" "}
                            {resumes[Object.keys(resumes)[0]].gender}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Religion</td>
                        <td>
                          :{" "}
                          <span className="religion">
                            {" "}
                            {resumes[Object.keys(resumes)[0]].religion}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Nationality</td>
                        <td>
                          :{" "}
                          <span className="nationality">
                            {" "}
                            {resumes[Object.keys(resumes)[0]].nationality}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Marital Status</td>
                        <td>
                          :{" "}
                          <span className="marital-status">
                            {" "}
                            {resumes[Object.keys(resumes)[0]].maritalStatus}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Hobbies</td>
                        <td>
                          :{" "}
                          <span className="hobbies">
                            {" "}
                            {resumes[Object.keys(resumes)[0]].hobbies}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr className="languages-known-section zsection">
                <td className="fw-bold align-top text-nowrap pr title">
                  Languages Known
                </td>
                <td className="pb-3 languages">
                  {" "}
                  {resumes[Object.keys(resumes)[0]].language}
                </td>
              </tr>

              {/* <tr className="declaration-section zsection">
                <td className="fw-bold align-top text-nowrap pr title">
                  Declaration
                </td>
                <td className="pb-5 declaration">
                  I hereby declare that above information is correct to the best
                  of my knowledge and can be supported by relevant documents as
                  and when required.
                </td>
              </tr> */}
              <tr>
                <td className="px-3">
                  Date :{" "}
                  {new Date(
                    resumes[Object.keys(resumes)[0]].DOB
                  ).toLocaleDateString()}
                </td>
                <td className="px-3 name text-end">
                  {" "}
                  {resumes[Object.keys(resumes)[0]].name}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Resume;
