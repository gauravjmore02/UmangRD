import React,{ useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [clients, setClients] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/clients/all")
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleRow = (cid) => {
    setExpandedRow(expandedRow === cid ? null : cid);
  };
 function transaction(cid){
  navigate(`/transactions/${cid}`);
 }
 function payRd(cid){
  navigate(`/pay/${cid}`);
 }
 function updateRd(cid){
  navigate(`/updt/${cid}`);
 }
 const deleteRd = async (cid) => {
  try {
    await axios.put(`http://localhost:8080/clients/delete/${cid}`);
    alert("client deleted");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Container fluid className="mt-4">
      <Button variant="primary" onClick={()=>navigate('/addClient')} style={{margin:'10px'}}>Add Client</Button>
      <Card className="shadow">
        <Card.Body>
          <Card.Title>Client List</Card.Title>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>CID</th>
                <th>Acc No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>RD Amount</th>
                <th>View</th>
                <th>Pay</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((c) => (
                <React.Fragment key={c.cid}>
                  {/* MAIN ROW */}
                  <tr key={`main-${c.cid}`}>
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
                      >
                        {expandedRow === c.cid ? "Hide" : "View"}
                      </Button>
                      <Button size="sm" variant="info" onClick={()=>transaction(c.cid)} style={{marginLeft:'10px'}}>Transactions</Button>
                    </td>
                    <td>
                      <Button size="sm" variant="success" onClick={()=>payRd(c.cid)} style={{marginLeft:'10px'}}>Pay</Button>
                    </td>
                    <td>
                       <Button size="sm" variant="warning" onClick={()=>updateRd(c.cid)} style={{marginLeft:'10px'}}>Update</Button>
                        <Button size="sm" variant="danger" onClick={()=>deleteRd(c.cid)} style={{marginLeft:'10px'}}>Delete</Button>
                    </td>

                  </tr>

                  {/* EXPANDED ROW */}
                  {expandedRow === c.cid && (
                    <tr key={`expanded-${c.cid}`} className="bg-light">
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

export default Home;
