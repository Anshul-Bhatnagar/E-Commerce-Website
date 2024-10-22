import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./adminpanel.css"

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });

  // Fetch products from the backend with token verification
//   useEffect(() => {
//     const token = localStorage.getItem('token');  // Retrieve token from localStorage

//     axios.get('http://localhost:5000/products', {
//       headers: {
//         'Authorization': `Bearer ${token}`,  // Pass token in the Authorization header
//       }
//     })
//     .then((response) => setProducts(response.data))
//     .catch((error) => {
//       console.error('Error fetching products:', error);
//       if (error.response && error.response.status === 401) {
//         // Handle unauthorized access (token invalid or expired)
//         console.log('Token expired or invalid, redirecting to login...');
//         window.location.href = '/login';  // Redirect to login page if token is invalid
//       }
//     });
//   }, []);

useEffect(() => {
    const fetchProducts = async () =>{
      try{
        const token = localStorage.getItem("authToken");
        
        

        const response = await axios.get('http://localhost:5000/products',{
          headers:{
            Authorization:`Bearer ${token}`
          },
        });
        setProducts(response.data);
      }
      catch(error){
          console.error("error fetching product ", error);
          
      }
      


    };


    fetchProducts();
  

    
  
  }, []);
  // Handle form inputs for adding/updating products
  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image input for new product
  const handleImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files[0],
    });
  };

  // Function to add a new product
  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('stock', newProduct.stock);
    formData.append('image', newProduct.image);
 
    //const token = localStorage.getItem('token'); // Retrieve the token
    const token = localStorage.getItem('authToken'); // Use 'authToken' instead of 'token'

    
 
    try {
      const response = await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token
          'Content-Type': 'multipart/form-data',
        },
      });
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
 };
 

  // Function to delete a product
  const deleteProduct = async (productId) => {
    const token = localStorage.getItem('authToken');  // Retrieve token from localStorage

    try {
      await axios.delete(`http://localhost:5000/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Include token for authorization
        },
      });
      setProducts(products.filter((product) => product.id !== productId));  // Remove the deleted product from the list
    } catch (error) {
      console.error('Error deleting product:', error);
      if (error.response && error.response.status === 401) {
        console.log('Token expired or invalid, redirecting to login...');
        window.location.href = '/login';  // Redirect to login page if token is invalid
      }
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Form to add a new product */}
      <form onSubmit={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleInputChange}
          required
        />
        <input type="file" name="image" onChange={handleImageChange} required />
        <button type="submit">Add Product</button>
      </form>

      {/* List of products with delete option */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            {product.image && <img src={product.image} alt={product.name} style={{ width: '100px' }} />}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
