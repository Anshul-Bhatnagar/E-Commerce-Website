import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from "./pages/Home";
//import ProductList from "./component/productList";
import Cart from "./pages/Cart";
//import Navbar from "./component/Navbar";
import Signup from "./component/Signup";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import AdminPanel from "./component/AdminPanel";
import ProductDetail from "./component/ProductDetail";
import { ProductProvider } from "./context/ProductContext"; // Import ProductProvider





function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  
  return (
    <ProductProvider>
    
<Router>
       
       <div>

       {isLoggedIn && <Navbar />}
       
        
         <Routes>

            
          {!isLoggedIn && <Route path="/" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />}
          {!isLoggedIn && <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />}

          
          {isLoggedIn && <Route path="/Home" element={<Home />} />}
           
           
           <Route path="/ProductDetail" element={<ProductDetail />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/admin" element={<AdminPanel />} />
         </Routes>
       </div>
     </Router>
     </ProductProvider>
  );
}

export default App;
