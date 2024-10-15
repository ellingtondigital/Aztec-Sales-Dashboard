import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "./config";
import Logo from "../src/Screen/Logoimage.png";
import { useNavigate } from "react-router-dom";  // Updated import

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // State to track successful signup

  const navigate = useNavigate();  // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setSuccess(true); // Set success to true if signup is successful
        setError("");  // Clear any previous error
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to sign up");
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
        style={{ maxWidth: "400px", width: "100%" }}
      >
        {/* Insert the image here */}
        <div className="text-center mb-3">
          <img
            src={Logo}
            alt="Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <h3 className="mb-3 text-center">Sign Up</h3>

        {/* Show success message if registration is successful */}
        {success && <Alert variant="success">Sign-up successful! You can now log in.</Alert>}

        {/* Show error message if sign-up failed */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Username Input */}
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          {/* Email Input */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* Password Input */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Sign-Up Button */}
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: "#F36523", borderColor: "#F36523" }}
          >
            Sign Up
          </Button>

          {/* Already have an account link */}
          <div className="mt-3 text-center">
            <Button
              variant="link"
              style={{ color: "#F36523" }}
              onClick={() => navigate("/")}
            >
              Already have an account? Login here
            </Button>
          </div>
        </Form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>&copy;  Copyright 2024 Aztec Solar, Inc. | Privacy Policy and Terms & Conditions | Disclaimer | CA Contractor License #550110| All Rights Reserved.</p>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
