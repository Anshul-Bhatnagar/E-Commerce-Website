// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Home() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         console.log(token);

//         const response = await axios.get('http://localhost:5000/products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="product-listing">
//       <h1>Product Listing</h1>
//       <div className="products">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             {product.image && (
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 style={{ width: '500px', height: '500px', cursor: 'pointer' }}
//               />
//             )}
//             <h3>{product.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;



import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; // Import context
import "./home.css"


function Home() {
  const [products, setProducts] = useState([]);
  const { setSelectedProduct } = useContext(ProductContext); // Get setSelectedProduct from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log(token);

        const response = await axios.get('http://localhost:5000/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the selected product in context
    navigate(`/productDetail`); // Navigate to the ProductDetail page
  };

  return (
    <div className="product-listing">
      <h1>Product Listing</h1>
      <div className="products">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card" 
            onClick={() => handleProductClick(product)} // Handle click
            style={{ cursor: 'pointer' }} 
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '500px', height: '500px' }}
              />
            )}
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
