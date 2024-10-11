import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CartProduct from "./components/CartProduct";
import Checkout from "./components/Checkout";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
// import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <>
      <Router>
      <Header />
      
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/cart" element={<CartProduct/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        {/* <Route path="/payment" element={<PaymentPage/>}/> */}
        <Route path="/success" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>}/>
        </Routes>
     
      <Footer/>
      </Router>
    </>
  );
}

export default App;
