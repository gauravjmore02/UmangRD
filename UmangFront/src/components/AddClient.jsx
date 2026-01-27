import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
    const navigate=useNavigate();

  const [client, setClient] = useState({
    name: "",
    address: "",
    gender: "",
    mob: "",
    dob: "",
    accno: "",
    adhar: "",
    pan: "",
    nominee_name: "",
    nominee_pan: "",
    nominee_adhar: "",
    rdstart: "",
    rdamount: "",
    active: true
  });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/clients/save", client)
      .then(() => {
        alert("Client Added Successfully");
        setClient({
          name: "",
          address: "",
          gender: "",
          mob: "",
          dob: "",
          accno: "",
          adhar: "",
          pan: "",
          nominee_name: "",
          nominee_pan: "",
          nominee_adhar: "",
          rdstart: "",
          rdamount: "",
          active: true
        });
        navigate('/home')
      })
      .catch(err => console.error(err));
  };

  return (
    <Card className="shadow mt-4">
      <Card.Header className="bg-primary text-white">
        Add Client
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit}>

          {/* Client Info */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={client.name}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label>Account No</Form.Label>
              <Form.Control
                name="accno"
                value={client.accno}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              value={client.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={client.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                name="mob"
                value={client.mob}
                onChange={handleChange}
              />
            </Col>

            <Col md={4}>
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={client.dob}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Aadhar</Form.Label>
              <Form.Control
                name="adhar"
                value={client.adhar}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>PAN</Form.Label>
              <Form.Control
                name="pan"
                value={client.pan}
                onChange={handleChange}
              />
            </Col>
          </Row>

          {/* Nominee */}
          <h6 className="mt-4">Nominee Details</h6>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                placeholder="Nominee Name"
                name="nominee_name"
                value={client.nominee_name}
                onChange={handleChange}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="Nominee PAN"
                name="nominee_pan"
                value={client.nominee_pan}
                onChange={handleChange}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="Nominee Aadhar"
                name="nominee_adhar"
                value={client.nominee_adhar}
                onChange={handleChange}
              />
            </Col>
          </Row>

          {/* RD */}
          <h6 className="mt-4">RD Details</h6>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>RD Start Date</Form.Label>
              <Form.Control
                type="date"
                name="rdstart"
                value={client.rdstart}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>RD Amount</Form.Label>
              <Form.Control
                type="number"
                name="rdamount"
                value={client.rdamount}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Button type="submit" variant="success">
            Save Client
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddClient;
