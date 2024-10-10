const express = require('express');
const  mysql = require('mysql2');
const dotenv =  require('dotenv');
const productModel = require('./models/productModel');
const bodyParser = require('body-parser');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/userModel');
const authenticateToken = require('./authMiddleware');
const mailer = require('./mailer')
const crypto = require('crypto');
const cors = require('cors')
const { log, error } = require('console');







dotenv.config();
const app = express();
const port = process.env.port || 5000;
app.use(express.json());
app.use(cors());
app.use('/products',authenticateToken);

// mysql connection

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });



// connect to the database

// db.connect((err) => {
//     if(err){
//         console.error('database connection failed', err.stack);
//         return;

//     }
//      console.log('connected to mysql database');
     
// });




app.get('/', (req,res) =>{
    res.send('e-commrce backend is alll running')
});



// app.get('/products', (req,res) => {
//     const query = 'select * from products';
//     db.query(query, (err, results) => {
//         if(err){
//             res.status(500).json({error: err});
//         }
//         else {
//             res.status(200).json(results)
//         }
//     });
// });

// route to fetch all product

// app.get('/products',(req,res) => {
//     productModel.getAllProducts((err,results) => {
//         if(err){
//             return res.status(500).json({error:err});
//         }
//         res.status(200).json(results);
//     });
// });


app.get('/products',(req,res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page-1)*limit;

    productModel.getPaginatedProducts(offset,limit,(err,result) => {
        if(err) {
            return res.status(500).json({error:err});
        }
        res.status(200).json(result);
    });
});


// app.post('/products', (req,res) =>{
//     const {name,description,price,stock} = req.body;
//     const query = 'INSERT INTO products (name,description,price,stock) VALUES (?,?,?,?)';
//     db.query(query, [name,description,price,stock], (err,result) => {
//         if(err){
//             res.status(500).json({error:err});

//         }
//         else{
//             res.status(201).json({id:result.insertId,name,description,price,stock});

//         }
//     });
// });

//route to add a new product
// app.post('/products', (req,res) => {
//     const newProduct = req.body;
//     productModel.addProduct(newProduct,(err,result) => {
//         if(err){
//             return res.status(500).json({error:err});
//         }
//         res.status(201).json({id:result.insertId, ...newProduct});

//     });
// });



const productSchema = joi.object({
    name:joi.string().min(3).required(),
    description:joi.string().min(5).required(),
    price:joi.number().positive().required(),
    stock:joi.number().integer().positive().required(),

});


app.post('/products',(req,res) => {
    const {error} =productSchema.validate(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }

    const newProduct = req.body;
    productModel.addProduct(newProduct,(err,result) =>{
        if(err){
            return res.status(500).json({error:err});
        }
        res.status(201).json({id:result.inserted, ...newProduct});
    });
});




//route to get a product by ID
app.get('/products/:id', (req,res) => {
    const productId = req.params.id;
    productModel.getProductById(productId,(err,result)=>{
        if(err){
            return res.status(500).json({error:err});

        }
        if(result.length === 0){
            return res.status(404).json({message:'product not found'});

        }
        res.status(200).json(result[0]);
    })
})



//route to update a product

app.put('/products/:id', (req,res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    
    
    productModel.updateProduct(productId,updatedProduct,(err,result) =>{
        if(err){
            return res.status(500).json({error:err});

        }
        if(result.affectedRows ===0){
            return res.status(404).json({message:'product not found'});

        }
        res.status(200).json({message:'product updated successfully'});
    });
});


// route to delete a product

app.delete('/products/:id', (req,res) => {
    const productId = req.params.id;
    productModel.deleteProduct(productId,(err,result)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        if(result.affectedRows===0){
            return res.status(404).json({message:'product not found'});
        }
        res.status(200).json({message:'product deleted sucessfully'});
    });
});



//user ragistration

// app.post('/register', async(req,res) => {
//     const {username,password} = req.body;
//     const hashedPassword = await bcrypt.hash(password,10);
//     userModel.addUser({username,password: hashedPassword}, (err,result) => {
//         if(err){
//             return res.status(500).json({ error: err});
//         }
//         res.status(201).json({id:result.inserted,username});
//     }); 
// });

//user ragistration add email ki hai isliye nya 
// app.post('/register',(req,res)=>{
//     const newUser = req.body;
//     userModel.createUser(newUser,(err,result)=>{
//         if(err){
//             return res.status(500).json({error:err});

//         }
//         res.status(201).json({id:result.inserted, ...newUser});
//     });
// });



// user registration email verification add kiya hai isliye

app.post('/register', (req,res) =>{
    const newUser = req.body;
     //create verification token
     const atoken = crypto.randomBytes(32).toString('hex');
     const verificationToken = atoken.replace(/['"]+/g, '');


    
      userModel.createUser({...newUser,verificationToken},(err,result) => {
        if(err){
            return res.status(500).json({error:err});
        }

       
        
        //send verification email
        mailer.sendVerificationEmail(newUser.email,verificationToken)
        .then(()=>{
            res.status(201).json({id:result.insertId, ...newUser, verificationToken});

        })
        .catch(error =>{
            console.error('error sending verification email:',error);
            res.status(500).json({message:'user created but verification emailfailed'});

            
        });
        

        
    });
});



//verification route

app.get('/verify/:token', (req,res) =>{
    const token = req.params.token;
    //herebyou can store the token in the database and associated it with the user for actual implementation
    // for demonstration purposes, assume tokenis the user email

    userModel.verifyUser(token, (err,result)=>{
        if(err) {
            console.log(err);
            
            return res.status(500).json({error:err});

        }
        if(result.affectedRows === 0){
            return res.status(404).json({message:'user not found'});

        }
        res.status(200).json({message:'email verified sucessfully'});


    });
});
 




//user login

// app.post('/login', (req,res) => {
//     const {username,password}=req.body;

//     userModel.findUserByUsername(username,async(err,result) =>{
//         if(err || result.length===0){
//             return res.status(401).json({message:'invalid username or paasword'});

//         }
//         const user = result[0];
//         const isMatch = await bcrypt.compare(password,user.password);

//         if(!isMatch){
//             return res.status(401).json({message:'invalid username or paasword'});

//         }
//         const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:'1h'});
//         res.status(200).json({token})
//     });
// });



//route to login a user
app.post('/login', (req,res) => {
    const {email,password} = req.body;
    userModel.getUserByEmail(email,(err,result) => {
        if(err){
            return res.status(500).json({error:err});

        }
        if(result.length===0){
            return res.status(404).json({message:'user not found'});
        }

        // compare the password with the hashed password
        const isMatch = bcrypt.compareSync(password,result[0].password);
        if(!isMatch){
            return res.status(401).json({message:'invalid credentilas'});

        }
        //generate jwt token
        const token = jwt.sign({id:result[0].id, email:result[0].email},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({token});
    });
});


//Route to update user password

app.put('/users/update-password', authenticateToken, (req,res) =>{
    const {oldPassword, newPassword} = req.body;
    const userId = req.user.id;


    //fetch the user from the database
    userModel.getUserById(userId, (err,result) => {
        if(err) return res.status(500).json({error:err});
        if(result.length===0) return res.status(404).json({message:'user not found'});

        const user = result[0];

        //verify the old password
        bcrypt.compare(oldPassword,user.password,(err,isMatch) =>{
            if(err) return res.status(500).json({error:err});
            if(!isMatch) return res.status(401).json({message:'old password is incorrec'});

            //hash the new password and update it
            bcrypt.hash(newPassword,10,(err,hashedPassword) =>{
                if(err) return res.status(500).json({error:err});

                userModel.updatePassword(userId,hashedPassword,(err,result)=>{
                    if(err) return res.status(500).json({error:err});

                    res.status(200).json({message:'paasword updated sucessfully'});
                });
            });
        });
    });

});


app.listen(port, () =>{
    console.log(`server is running port ${port}`);
    
});