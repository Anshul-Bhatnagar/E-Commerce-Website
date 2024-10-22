import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext"; // Import context
import "./productdetail.css"

function ProductDetail() {
  const { selectedProduct } = useContext(ProductContext); // Get the selected product from context

  if (!selectedProduct) {
    return <p>No product selected.</p>; // Handle case where no product is selected
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <div className="product-detail">
        {selectedProduct.image && (
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{ width: '500px', height: '500px' }}
          />
        )}
        <h3>{selectedProduct.name}</h3>
        <p>{selectedProduct.description}</p>
        <p>Price: {selectedProduct.price}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
