import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateClient = () => {
  const { cid } = useParams();
  const [message, setMessage] = useState("");
  const navigate=useNavigate();

  const [client, setClient] = useState({
    cid: cid,
    accno: "",
    active: true,
    address: "",
    adhar: "",
    dob: "",
    gender: "",
    mob: "",
    name: "",
    nominee_name: "",
    nominee_pan: "",
    nominee_adhar: "",
    pan: "",
    rdamount: "",
    rdstart: ""
  });

  // Load client data by cid
  useEffect(() => {
    axios
      .get(`http://localhost:8080/clients/client/${cid}`)
      .then((res) => setClient(res.data))
      .catch((err) => console.error(err));
  }, [cid]);

  //  Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClient({
      ...client,
      [name]: type === "checkbox" ? checked : value
    });
  };

  //  Update client
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/clients/update/${cid}`, client)
      .then(() =>{
         setMessage("Client updated successfully ");
         navigate('/home');

      })
      .catch(() => setMessage("Update failed "));
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Update Client</h3>

      {message && <Alert variant="info">{message}</Alert>}

      <Form >
        
        <input type="hidden" name="cid" value={client.cid} />

        <Row>
          
          <Col md={6}>
            

             <Form.Group className="mb-3">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                name="accno"
                value={client.accno}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={client.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                name="mob"
                value={client.mob}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                name="gender"
                value={client.gender}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={client.dob}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={client.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>PAN</Form.Label>
              <Form.Control
                name="pan"
                value={client.pan}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Aadhaar</Form.Label>
              <Form.Control
                name="adhar"
                value={client.adhar}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>RD Amount</Form.Label>
              <Form.Control
                name="rdamount"
                value={client.rdamount}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>RD Start Date</Form.Label>
              <Form.Control
                type="date"
                name="rdstart"
                value={client.rdstart}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Check
              className="mb-3"
              type="checkbox"
              label="Active"
              name="active"
              checked={client.active}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* NOMINEE SECTION */}
        <hr />
        <h5>Nominee Details</h5>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Nominee Name</Form.Label>
              <Form.Control
                name="nominee_name"
                value={client.nominee_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Nominee PAN</Form.Label>
              <Form.Control
                name="nominee_pan"
                value={client.nominee_pan}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Nominee Aadhaar</Form.Label>
              <Form.Control
                name="nominee_adhar"
                value={client.nominee_adhar}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* SUBMIT */}
        <div className="text-center">
          <Button variant="primary" onClick={handleSubmit}>
             Update Client
            </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateClient;
