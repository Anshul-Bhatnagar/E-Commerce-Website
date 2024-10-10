const db = require('../config/db');
const bcrypt = require('bcrypt');


//function to add a new user

// const addUser = (user, callback) =>{
//     const query = 'INSERT INTO users (username,password) VALUES (?,?)';
//     db.query(query,[user.username,user.password], callback);

// };


//function to create a new user

const createUser = (user, callback)=>{
    const hashedPassword = bcrypt.hashSync(user.password,10);
    const query = 'INSERT INTO users (username,email,password,verificationToken) VALUES(?,?,?,?)';
    db.query(query,[user.username,user.email,hashedPassword,user.verificationToken],callback);
    

};



//function to get a user by email
const getUserByEmail = (email,callback) => {
     const query = 'SELECT * FROM users WHERE email=?';
     db.query(query,[email],callback);
};




// function to find a user by username
const findUserByUsername = (username,callback) => {
    db.query('SELECT * FROM users WHERE username = ?',[username],callback);

};


const updatePassword = (id,hashedPassword,callback) => {
    const query = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(query,[hashedPassword,id],callback);
};

//get user by id
const getUserById=(id,callback)=>{
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query,[id],callback);
};


// const verifyUser = (Token,callback) => {
//     console.log(`aaya hua ${Token}`);
   
//     //update query
//     const query = 'UPDATE users SET verified = ? WHERE verificationToken = ?';
//     db.query(query,[1,Token],callback);
// }


const verifyUser = (token, callback) => {
    console.log(`Received token for verification: ${token}`);

    // First, check if a user exists with this verification token
    const selectQuery = 'SELECT * FROM users WHERE verificationToken = ?';
    db.query(selectQuery, [token], (err, result) => {
        if (err) {
            console.error('Error finding user:', err);
            return callback(err);
        }

          // Log the query result
          console.log(`Query result: ${JSON.stringify(result)}`); 

        if (result.length === 0) {
            // If no user found with this token
            console.log('User with token not found.');
            return callback(null, { affectedRows: 0 }); // Return a custom object indicating no affected rows
        }

        // If user found, proceed to update the verified status
        const query = 'UPDATE users SET verified = ? WHERE verificationToken = ?';
        db.query(query, [1, token], (err, updateResult) => {
            console.log('Executing query:', query, 'with values:', [1, Token]);
            if (err) {
                console.error('Error updating user:', err);
                return callback(err);
            }

            callback(null, updateResult); // Pass the update result to the callback
        });
    });
};


module.exports = {
    findUserByUsername,
    updatePassword,
    getUserById,
    createUser,
    getUserByEmail,
    verifyUser,
};