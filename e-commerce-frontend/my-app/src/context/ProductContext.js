import React, { createContext, useState } from "react";

// Create a context for the product
export const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
