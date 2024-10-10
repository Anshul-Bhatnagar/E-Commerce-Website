import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./component/productList";
import Cart from "./pages/Cart";
//import Navbar from "./component/Navbar";
import Signup from "./component/Signup";
import Navbar from "./component/Navbar";
import Login from "./component/Login";




function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  
  return (
    
<Router>
       
       <div>

       {isLoggedIn && <Navbar />}
       
        
         <Routes>

            
          {!isLoggedIn && <Route path="/" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />}
          {!isLoggedIn && <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />}

          
          {isLoggedIn && <Route path="/Home" element={<Home />} />}
           
           
           <Route path="/productList" element={<ProductList />} />
           <Route path="/cart" element={<Cart />} />
         </Routes>
       </div>
     </Router>
  );
}

export default App;
