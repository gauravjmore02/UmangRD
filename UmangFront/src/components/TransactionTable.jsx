import { Table, Badge,Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TransactionTable = () => {
  const navigate=useNavigate();
  const { cid } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/transaction/clients/${cid}`)
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, [cid]);

  return (
    <>
    <Button variant="primary" onClick={()=>navigate('/home')} style={{margin:'10px'}}>Back</Button>
   <h2> <center>Transactions(Client id:{cid})</center></h2>
    <Table striped bordered hover className="mt-3">
      
      <thead className="table-dark">
        
        <tr >
          <th>TID</th>
          
          <th>Due Date</th>
          <th>Paid Date</th>
          <th>Late Days</th>
          <th>Fine</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map(t => (
          <tr key={t.tid}>
            <td>{t.tid}</td>
            
            <td>{t.duedate}</td>
            <td>{t.installment_pay}</td>
            <td>{t.late_days}</td>
            <td>₹{t.fine_amount}</td>
            <td>₹{t.total_amount}</td>
            <td>
              {t.flag ? (
                <Badge bg="success">Paid</Badge>
              ) : (
                <Badge bg="danger">Unpaid</Badge>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default TransactionTable;
