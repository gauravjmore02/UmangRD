import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { differenceInDays, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

  

const FINE_PER_DAY = 50; 

function PayInstallment() {
  const navigate=useNavigate();
  const { cid } = useParams();
  const [paymentDate, setPaymentDate] = useState("");
  const [lastTxn, setLastTxn] = useState(null);
  const [rdAmount, setRdAmount] = useState(0);
  const [calc, setCalc] = useState({
    dueDate: "",
    lateDays: 0,
    fineAmount: 0,
    totalAmount: 0,
  });
  const [result, setResult] = useState(null);

  // Fetch last transaction and RD amount for this client
 const [client, setClient] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const clientRes = await axios.get(`http://localhost:8080/clients/client/${cid}`);
      setClient(clientRes.data);
      setRdAmount(clientRes.data.rdamount);

      const txnRes = await axios.get(`http://localhost:8080/transaction/clients/${cid}`);
      if (txnRes.data.length > 0) {
        setLastTxn(txnRes.data[txnRes.data.length - 1]);
      } else {
        setLastTxn(null);
      }
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
}, [cid]);

  
  useEffect(() => {
  try {
    if (!paymentDate || !rdAmount || !client) return;

    const payment = parseISO(paymentDate);

    let due;
    if (!lastTxn) {
      // first installment → use client's RD start date
      due = parseISO(client.rdstart);
    } else {
      due = parseISO(lastTxn.duedate);
      due = new Date(due.setMonth(due.getMonth() + 1)); // next installment
    }

    const lateDays = Math.max(differenceInDays(payment, due), 0);
    const fineAmount = lateDays * FINE_PER_DAY;
    const totalAmount = rdAmount + fineAmount;

    setCalc({
      dueDate: due.toISOString().split("T")[0],
      lateDays,
      fineAmount,
      totalAmount,
    });
  } catch (err) {
    console.error("Error calculating installment:", err);
  }
}, [paymentDate, lastTxn, rdAmount, client]);

  const payInstallment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/transaction/pay/${cid}`,
        null,
        { params: { installmentPay: paymentDate } }
      );
      setResult(res.data);
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Pay RD Installment</Card.Title>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Payment Date:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </Col>
            </Form.Group>
            {paymentDate && (
              <Card className="mb-3 bg-light">
                <Card.Body>
                  <h6>Installment Calculation</h6>
                  <p><b>Due Date:</b> {calc.dueDate}</p>
                  <p><b>Late Days:</b> {calc.lateDays}</p>
                  <p><b>Fine Amount:</b> ₹{calc.fineAmount}</p>
                  <p><b>Total Amount:</b> ₹{calc.totalAmount}</p>
                </Card.Body>
              </Card>
            )}
            <Button variant="primary" onClick={payInstallment}>
              Pay
            </Button>
          </Form>

          {result && (
            <Card className="mt-3">
              <Card.Body>
                <h5>Payment Successful</h5>
                <p><b>Due Date:</b> {result.duedate}</p>
                <p><b>Payment Date:</b> {result.installment_pay}</p>
                <p><b>Late Days:</b> {result.late_days}</p>
                <p><b>Fine Amount:</b> ₹{result.fine_amount}</p>
                <p><b>Total Amount:</b> ₹{result.total_amount}</p>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PayInstallment;
