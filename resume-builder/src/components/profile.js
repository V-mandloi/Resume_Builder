import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const fetchData = async (id) => {
  console.log("enter fetchDta");
  try {
    const response = await axios.get(
      `http://localhost:8080/resumelisting/${id}/profile`
    );
    console.log(response);
    return response.data; // return the response data
  } catch (error) {
    console.error(error);
    return null;
  }
};

// fetchData();

function Profile() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(id).then((response) => {
      setData(response);
      console.log(response); // log the response data here
    });
  }, [id]);

  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">
            Resume Builder
          </a>
          <div>
            <button className="btn btn-sm btn-danger">
              <i className="bi bi-box-arrow-left" /> Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container back-glass-login">
        <div className=" rounded shadow p-2 mt-4">
          <div className="d-flex justify-content-between border-bottom">
            <h5>Edit Profile</h5>
            <div>
              <a
                href={`http://localhost:3000/resumelisting/${id}`}
                className="text-decoration-none"
              >
                <i className="bi bi-arrow-left-circle" /> Back
              </a>
            </div>
          </div>
          <div className="p-3">
            {data && (
              <div>
                <h2>Welcome, {data.username}</h2>
                <br />
                <p>Email: {data.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
