// src/App.js
import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Homepage from "./components/home/HomePage";
import LoginForm from "./components/login/Login";
import RegisterForm from "./components/register/Register";
import { useAuthContext } from "./context/AuthContextProvider";
import Navbar from "./components/Navbar";

function App() {
  const { isAuthenticated, user, loading } = useAuthContext();
  //console.log(user);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
