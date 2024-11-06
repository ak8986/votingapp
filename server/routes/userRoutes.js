// const express = require('express');
// const router = express.Router();
// const User = require('./../models/user');
// const{jwtAutMiddleware, generateToken}= require('./../jwt');
// const { error } = require('console');

// router.post('/signup',async(req,res)=>{
//     try{
//         const data = req.body
//         const newUser = new User(data);

//         const response = await newUser.save();
//         console.log('data saved');

//         const payload={
//             id: response.id
            
//         }
//         console.log(JSON.stringify(payload));
//         const token = generateToken(payload);
//         console.log("Token is:",token);

//         res.status(200).json({response: response,token:token});

//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error,'Internet Server Error'});
//     }

// })

// // login route

// router.post('/login',async(req, res)=>{
//     try{
//         const {aadharnumber, password}= req.body;

//         const user = await Person.findOne({aadharnumber: username});

//         if(!user || !(await user.comparePassword(password))){
//             return res.status(401).json({error: 'Invalid username or password'});
//         }

//         const payload ={
//             id: user.id,
           
//         }
//         const token = generateToken(payload);

//         res.json({token})

//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// router.put('/:id',async(req,res))=>{
//     try{
//         const personId = req.params.id;
//         const updatePersonData = req.body;

//         const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
//             new: true,
//             runValidators: true,
//         })
//         if(!response){
//             return res.status(404).json({error:'Person not found'});
//         }

//         console.log('data uploaded');
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(200).json(response);
//     }
// }


const express = require ("express");
const User = require('../models/user');
const router = express.Router();

const {jwtAutMiddleware, generateToken} = require('./jwt');
// POST route for adding person
router.post('/signup', async (req, res) => {
    try{
      const data = req.body // Assuming the request body contains the person data
      // create a new newUser document using the mongoose model
      const newUser = new User(data);
      // newUser.name = data.name;
     console.log("1 here")
      const response = await newUser.save();
      console.log('data saved');

      const payload = {
            id: response.id,
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log('token is' , token);

      res.status(200).json({response: response, token: token});
  }
  catch(err){
    console.log("here")
      console.log(err);
      res.status(500).json({error: 'internal server error'});
  }
  })

  // login route
  router.post('/login', async (req, res) => {
    try{
        // extract username and password from request body
        const {aadharCardNumber, password} = req.body;

        // find the user by username
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        // if user does not exist or password does not match
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'invalid username or password'});
        }
        // generate token
        const payload = {
            id: user.id,
        }    
        const token = generateToken(payload);

        // return token as a response
        res.json({token})
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }

})

// profile route
router.get('/profile',jwtAutMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);

        res.status(200).json({user})
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.put('/profile/password', async(req, res) => {
    try{
        const userId = req.user.id; //parser will extract the id from the token
        const {currentPassword, newPassword} = req.body //extract current the new passsword from the request body
        
        // find the user by userId
        const user = await User.findById(userId);
        // if password does not match return error
        if(!user || !(await user.comparePassword(currentPassword))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // update the user password
        user.password = newPassword;
        await user.save();

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})

router.post('/admin/login',async(req,res)=>{
    try{
        // extract username and password from request body
        const {aadharCardNumber, password} = req.body;

        // find the user by username
        const user = await User.findOne({aadharCardNumber: aadharCardNumber,role:"admin"});

        // if user does not exist or password does not match
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'invalid username or password'});
        }
        // generate token
        const payload = {
            id: user.id,
        }    
        const token = generateToken(payload);

        
        res.json({token})
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.post('/admin/signup', async (req, res) => {
    try{
      const data = req.body;
      const newUser = new User({...data,role:"admin"});
      const response = await newUser.save();

      const payload = {
            id: response.id,
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);

      res.status(200).json({response: response, token: token});
  }
  catch(err){
    console.log("here")
      console.log(err);
      res.status(500).json({error: 'internal server error'});
  }
  })


module.exports = router;







