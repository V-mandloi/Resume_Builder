import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Forgot from "./components/forgotPassword";
import Resumelisting from "./components/resumelisting";
import Createresume from "./components/createresume";
import Profile from "./components/profile";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/product")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<Forgot />} />
        <Route path="/resumelisting" element={<Resumelisting />} />
        <Route path="/createresume" element={<Createresume />} />
        <Route path="/profile" element={<Profile data={data} />} />
        {/* <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div> */}
      </Routes>
    </BrowserRouter>
    // <div>{data ? <p>{data.email}</p> : <p>Loading...</p>}</div>
  );
}

export default App;
