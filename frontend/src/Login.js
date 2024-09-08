// // frontend/src/Login.js
// import React, { useState } from 'react';
// import { Container, Form, Button, Alert } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const hardcodedUser = {
//   username: 'test@gmail.com',
//   password: '123456'
// };

// function Login({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username === hardcodedUser.username && password === hardcodedUser.password) {
//       onLogin();
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <div className="border p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
//         <h3 className="mb-3">Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Login
//           </Button>
//         </Form>
//       </div>
//     </Container>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from './config'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:5000/login', {
        const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="border p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-3">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
