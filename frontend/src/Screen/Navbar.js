// import React from 'react';
// import { Navbar, Nav } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from './Logoimage.png';

// function NavigationBar() {
//   // You can use `useNavigate` to programmatically navigate if needed
//   const navigate = useNavigate();

//   const handleUpdateFileClick = () => {
//     // Force a page reload
//     window.location.reload();
//   };

//   return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand as={Link} to="/">
//         <img
//           src={logo}
//           alt="Logo"
//           height="50" // Adjust the height as needed
//           className="d-inline-block align-top"
//         />
//       </Navbar.Brand>

//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
//         </Nav>
//         <Nav className="mr-auto">
//         <Nav.Link as={Link} to="/" onClick={handleUpdateFileClick} style={buttonStyle}>Update File</Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );

  
// }
// const buttonStyle = {
//   backgroundColor: 'indigo',
//   color: 'white',
//   padding: '10px 20px',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   display: 'inline-flex',
//   alignItems: 'center',
//   textDecoration: 'none',
//   fontWeight: 'bold',
// };
// export default NavigationBar;


import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons
import logo from './Logoimage.png';

function NavigationBar() {
  const navigate = useNavigate();

  const handleUpdateFileClick = () => {
    // Force a page reload
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg" >
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          alt="Logo"
          height="50" // Adjust the height as needed
          className="d-inline-block align-top"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav " />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Nav className="ml-auto" > {/* Align to the right */}
          <Nav.Link as={Link} to="/" onClick={handleUpdateFileClick} style={buttonStyle}>
            Update File
          </Nav.Link>
          <Nav.Link as={Link} to="/profile" style={buttonStyle}>
            <FaUser style={{ marginRight: '5px' }} /> Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


const buttonStyle = {
  backgroundColor: 'indigo',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontWeight: 'bold',
  marginLeft: '10px', // Add spacing between buttons
};

export default NavigationBar;
