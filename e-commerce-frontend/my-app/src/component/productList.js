// ProductDetail.js
import React from 'react';

const productList = ({ product, onClose }) => {
  return (
    <div className="product-detail-overlay" style={overlayStyle}>
      <div className="product-detail" style={detailStyle}>
        <button onClick={onClose} style={buttonStyle}>Close</button>
        <h2>{product.name}</h2>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '300px', height: '300px' }}
          />
        )}
        <p>Description: {product.description}</p>
        <p>Price: ₹{product.price}</p>
        <p>Stock: {product.stock}</p>
      </div>
    </div>
  );
};

// Styles for the overlay and detail
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const detailStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
};

const buttonStyle = {
  marginBottom: '20px',
};

export default productList;
