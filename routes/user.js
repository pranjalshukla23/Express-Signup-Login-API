//express
import express from 'express';

//router
export const router = express.Router();

//get users
import {getAllUsers, createUser, loginUser, transfer} from '../controllers/users.js';
import {authenticateUserDb} from "../services/authenticateUser.js";


//get request
//get all users
router.get('/users', getAllUsers);

//post request
//create user (signup)
router.post('/users/signup', createUser);

//post request
//login user
router.post('/users/login', authenticateUserDb, loginUser);


//post request
//send amount
router.post('/users/transfer', transfer);
