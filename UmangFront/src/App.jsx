import './App.css'

import { BrowserRouter as Router, Routes, Route, useLocation ,Outlet} from 'react-router-dom';

import UNavbar from './components/UNavbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import AddClient from './components/AddClient.jsx';
import TransactionTable from './components/TransactionTable.jsx';
import PayInstallment from './components/PayInstallment.jsx';
import UpdateClient from './components/UpdateClient.jsx';
import PriviousClient from './components/PriviousClient.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <UNavbar />}
      <Outlet />
    </>
  );
}
function App() {
  return (
     <Router>
      <Routes>

       
        <Route element={<Layout />}>

       
          <Route path="/" element={<Login />} />

          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addClient" element={<AddClient />} />
            <Route path="/transactions/:cid" element={<TransactionTable />} />
            <Route path="/pay/:cid" element={<PayInstallment />} />
            <Route path="/updt/:cid" element={<UpdateClient />} />
            <Route path="/clients/delete" element={<PriviousClient />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
