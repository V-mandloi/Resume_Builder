import React, { useEffect, useState } from "react";
import axios from "axios";

import "../style/resumeTemplate.css";

function Resume() {
  const [personalInfo, setPersonalInfo] = useState({});
  // const [experience, setExperience] = useState([]);
  // const [education, setEducation] = useState([]);
  // const [skills, setSkills] = useState([]);
  // const [personalDetails, setPersonalDetails] = useState({});
  // const [languages, setLanguages] = useState([]);
  console.log(personalInfo);

  useEffect(() => {
    axios
      .get("http://localhost:3000/resume")
      .then((response) => {
        const data = response.data;
        setPersonalInfo(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="page">
      <div className="subpage">
        <table className="w-100">
          <tbody>
            <tr>
              <td colspan="2" className="text-center fw-bold fs-4">
                Resume
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="personal-info zsection">
                <div className="fw-bold name">{personalInfo.name}</div>
                <div>
                  Mobile : <span className="mobile">{personalInfo.number}</span>
                </div>
                <div>
                  Email : <span className="email">{personalInfo.email}</span>
                </div>
                <div>
                  Address :{" "}
                  <span className="address">{personalInfo.address}</span>
                </div>
                <hr />
              </td>
            </tr>

            <tr className="objective-section zsection">
              <td className="fw-bold align-top text-nowrap pr title">
                Objective
              </td>
              <td className="pb-3 objective">
                To be a part of an organization where get a chance to use my
                knowledge and skills to contribute in the progress of the
                organizations as well as myself.
              </td>
            </tr>
            {personalInfo.experiences &&
              personalInfo.experiences.map((experience, index) => (
                <tr className="experience-section zsection">
                  <td className="fw-bold align-top text-nowrap pr title">
                    Experience
                  </td>
                  <td className="pb-3 experiences  key={index}">
                    <div className="experience mb-2">
                      <div className="fw-bold">
                        - <span className="job-role">{experience.company}</span>{" "}
                        (
                        <span className="duration">
                          {/* {personalInfo.experience[experience[0].company]} */}
                        </span>{" "}
                        )
                      </div>
                      <div className="company">{experience.position}</div>
                      <div>
                        <span className="working-from">
                          {experience.experience}
                        </span>{" "}
                        – <span className="working-to">Currently Working</span>
                      </div>
                      <div className="work-description">
                        Handling customers and fulfilling their needs
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            <tr className="education-section zsection">
              <td className="fw-bold align-top text-nowrap pr title">
                Education
              </td>
              <td className="pb-3 educations">
                <div className="education mb-2">
                  <div className="fw-bold">
                    -{" "}
                    <span className="course">
                      Completed 12th Class (Arts Stream)
                    </span>
                  </div>
                  <div className="institute">
                    Central Board Of Secondary Education, New Delhi
                  </div>
                  <div className="date">Passed in 2018</div>
                </div>

                <div className="education mb-2">
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
                </div>
              </td>
            </tr>

            <tr className="skills-section zsection">
              <td className="fw-bold align-top text-nowrap pr title">Skills</td>
              <td className="pb-3 skills">
                <div className="skill">
                  - Basic Knowledge in Computer & Internet
                </div>
                <div className="skill">- MS Office (Word,Excel,Powerpoint)</div>
              </td>
            </tr>

            <tr className="personal-details-section zsection">
              <td className="fw-bold align-top text-nowrap pr title">
                Personal Details
              </td>
              <td className="pb-3">
                <table className="pd-table">
                  <tr>
                    <td>Date of Birth</td>
                    <td>
                      : <span className="date-of-birth">06 March 2001</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>
                      : <span className="gender">Female</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Religion</td>
                    <td>
                      : <span className="religion">Muslim</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Nationality</td>
                    <td>
                      : <span className="nationality">Indian</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Marital Status</td>
                    <td>
                      : <span className="marital-status">Un-Married</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hobbies</td>
                    <td>
                      : <span className="hobbies">Listening Music</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="languages-known-section zsection">
              <td className="fw-bold align-top text-nowrap pr title">
                Languages Known
              </td>
              <td className="pb-3 languages">English & Hindi</td>
            </tr>

            <tr className="declaration-section zsection">
              <td className="fw-bold align-top text-nowrap pr title">
                Declaration
              </td>
              <td className="pb-5 declaration">
                I hereby declare that above information is correct to the best
                of my knowledge and can be supported by relevant documents as
                and when required.
              </td>
            </tr>
            <tr>
              <td className="px-3">Date : </td>
              <td className="px-3 name text-end">Najia Bano</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Resume;
