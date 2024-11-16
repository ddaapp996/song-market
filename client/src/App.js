import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import { AdminManage } from "./pages/AdminManage";

const App = () => {
  const [role, setRole] = useState("user");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute setRole={setRole}>{role === "user" ? <Home /> : <AdminManage />}</PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
