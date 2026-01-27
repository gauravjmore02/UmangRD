import axios from "axios";
import Container from 'react-bootstrap/Container';
import React,{ useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BrowserRouter as Router,Routes,Route,Link,useLocation} from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

function UNavbar() {
  const navigate=useNavigate();
  const [clients, setClients] = useState([]);
  
  
  useEffect(() => {
    axios.get("http://localhost:8080/clients/count")
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
  }, []);



  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Umang RD System</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to ="/home" style={{marginLeft:'10px'}}>Home</Link>
            <Link to ="/about" style={{marginLeft:'10px'}}>About</Link>
            <Link to ="/contact" style={{marginLeft:'10px'}}>Contact</Link>
             <Dropdown>
                <Dropdown.Toggle variant="light" size='sm'>
                  Modules
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/clients/delete")}>
                    Privious Clients
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </Nav>
         <h6>Total Active Clients:{clients}</h6>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UNavbar;