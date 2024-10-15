import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "./config"; // Ensure this is pointing to your API
import Logo from "../src/Screen/Logoimage.png";
import { useNavigate } from "react-router-dom";  // For navigation

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();  // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic Email Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        setSuccessMessage("A password reset link has been sent to your email.");
        setError("");  // Clear any previous errors
      } else {
        const result = await response.json();
        setError(result.message || "An error occurred");
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
      <div className="" style={{ maxWidth: "500px", width: "100%",border: "1px solid #ccc", borderRadius: "5px",padding: "20px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }} >
      
        {/* Insert the image here */}
        <div className="text-center mb-3">
          <img src={Logo} alt="Logo" style={{ maxWidth: "50%", height: "auto",paddingBottom: "30px" }} />
        </div>

        <h3 className="mb-3 text-center">Forgot Password</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: "#F36523", borderColor: "#F36523" }}
          >
            Reset Password
          </Button>

          {/* Navigate back to login page */}
          <div className="mt-3 text-center">
            <Button variant="link" style={{ color: "#F36523" }} onClick={() => navigate("/")} >
              Back to Login
            </Button>
          </div>
        </Form>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
        <p>&copy;  Copyright 2024 Aztec Solar, Inc. | Privacy Policy and Terms & Conditions | Disclaimer | CA Contractor License #550110| All Rights Reserved.</p>
      </div>
      </div>
    </Container>
  );
};

export default ForgotPassword;
