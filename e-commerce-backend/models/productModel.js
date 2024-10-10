const { SELECT } = require('sequelize/lib/query-types');
const db = require('../config/db');

//function to get all product

// const getAllProducts = (callback) => {
//     db.query('SELECT * FROM products',callback)
// };


//using pagination

const getPaginatedProducts = (offset,limit,callback) => {
    const query = 'SELECT * FROM products LIMIT ? OFFSET ?';
    db.query(query,[limit,offset],callback);

};


//function to get a product by ID

const getProductById = (id,callback) => {
    db.query('SELECT * FROM products WHERE id = ?',[id], callback);
}

// function to add a new product

const addProduct = (product, callback) => {
    const query = 'INSERT INTO products (name, description, price, stock) VALUES (?,?,?,?)';
    db.query(query, [product.name,product.description,product.price,product.stock], callback);

};


//function to update a product
const updateProduct = (id,product,callback) => {
    const query = 'UPDATE products SET name = ?,description=?,price=?,stock=? WHERE id=?';
    db.query(query, [product.name,product.description,product.price,product.stock,id],callback);

};

//function to delete a product
const deleteProduct = (id,callback) =>{
    db.query('DELETE FROM products WHERE id = ?',[id],callback);
};





module.exports = {
    //getAllProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getPaginatedProducts
};