import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/login/Login";
import RegisterForm from "./components/register/Register";
import Homepage from "./components/home/HomePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
