import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "./config";
import Logo from "../src/Screen/Logoimage.png";
import { useNavigate } from "react-router-dom";  // Updated import

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();  // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        onLogin();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className=""
        style={{ maxWidth: "500px", width: "100%",border: "1px solid #ccc", borderRadius: "5px",padding: "20px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
        {/* Insert the image here */}
        <div className="text-center mb-3">
          <img
            src={Logo}
            alt="Logo"
            style={{ maxWidth: "50%", height: "auto",paddingBottom: "30px" }}
          />
        </div>

        <h3 className="mb-3 text-center">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Login Button */}
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: "#F36523", borderColor: "#F36523" }}
          >
            Login
          </Button>

          {/* Forgot Password Link */}
          <div className="mt-3 text-center">
          <Button
  variant="link"
  style={{ color: "#F36523" }}
  onClick={() => navigate("/signup")}
>
  Don't have an account? Sign up here
</Button>
            <Button
              variant="link"
              style={{ color: "#F36523" }}
              onClick={() => navigate("/forgot-password")} 
            >
              Forgot Password?
            </Button>.
          </div>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy;  Copyright 2024 Aztec Solar, Inc. | Privacy Policy and Terms & Conditions | Disclaimer | CA Contractor License #550110| All Rights Reserved.</p>
      </div>
      </div>

    </Container>
  );
};

export default Login;
