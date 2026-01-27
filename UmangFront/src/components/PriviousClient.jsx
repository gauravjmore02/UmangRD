import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PriviousClient = () => {
  const [clients, setClients] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetchInactiveClients();
  }, []);

  const fetchInactiveClients = () => {
    axios
      .get("http://localhost:8080/clients/inactive")
      .then((res) => setClients(res.data))
      .catch((err) => console.error("Error fetching clients:", err));
  };

  
  const toggleRow = (cid) => {
    setExpandedRow(expandedRow === cid ? null : cid);
  };

  
  const revokeClient = async (cid) => {
    const confirm = window.confirm("Are you sure you want to activate this client?");
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:8080/clients/revoke/${cid}`);

      
      setClients((prev) => prev.filter((c) => c.cid !== cid));
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to activate client");
    }
  };

  return (
    <Container fluid className="mt-4">
      <Button
        variant="primary"
        onClick={() => navigate("/home")}
        style={{ margin: "10px" }}
      >
        Back
      </Button>

      <Card className="shadow">
        <Card.Body>
          <Card.Title>Inactive Client List</Card.Title>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>CID</th>
                <th>Acc No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>RD Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {clients.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No inactive clients found
                  </td>
                </tr>
              )}

              {clients.map((c) => (
                <React.Fragment key={c.cid}>
                  
                  <tr>
                    <td>{c.cid}</td>
                    <td>{c.accno}</td>
                    <td>{c.name}</td>
                    <td>{c.mob}</td>
                    <td>{c.gender}</td>
                    <td>₹ {c.rdamount}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() => toggleRow(c.cid)}
                        style={{marginLeft:'10px'}}
                      >
                        {expandedRow === c.cid ? "Hide" : "View"}
                      </Button>
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() => revokeClient(c.cid)}
                        style={{marginLeft:'10px'}}
                         >
                       Revoke
                      </Button>
                     
                    </td>
                  </tr>

                  
                  {expandedRow === c.cid && (
                    <tr className="bg-light">
                      <td colSpan="7">
                        <b>DOB:</b> {c.dob} <br />
                        <b>Address:</b> {c.address} <br />
                        <b>Aadhaar:</b> {c.adhar} <br />
                        <b>PAN:</b> {c.pan} <br />
                        <b>Nominee Name:</b> {c.nominee_name} <br />
                        <b>Nominee Aadhaar:</b> {c.nominee_adhar} <br />
                        <b>Nominee PAN:</b> {c.nominee_pan} <br />
                        <b>RD Start:</b> {c.rdstart} <br />
                        <b>Active:</b> {c.active ? "Yes" : "No"}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PriviousClient;
