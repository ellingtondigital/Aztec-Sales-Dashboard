import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "./config"; // Ensure this is pointing to your API
import { useNavigate, useLocation } from "react-router-dom";  // For navigation
import Logo from "../src/Screen/Logoimage.png";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the reset token from the URL
  const params = new URLSearchParams(location.search);
  const resetToken = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetToken) {
      setError("Reset token is missing.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset successfully. You can now log in.");
        setError("");
        // Redirect to login after a successful reset
        setTimeout(() => navigate("/"), 3000);
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
         <div className="text-center mb-3">
          <img src={Logo} alt="Logo" style={{ maxWidth: "50%", height: "auto",paddingBottom: "30px" }}/>
        </div>
        <h3 className="mb-3 text-center">Reset Password</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: "#F36523", borderColor: "#F36523" }}
          >
            Reset Password
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <Button variant="link" style={{ color: "#F36523" }} onClick={() => navigate("/")} >
            Back to Login
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
