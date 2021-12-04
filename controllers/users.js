//services
import {getAllUsersDb} from '../services/getAllUsers.js';
import {createUserDb} from "../services/createUser.js";
import {loginUserDb} from "../services/loginUser.js";
import {transferDb} from "../services/transfer.js";


//function to get users
export const getAllUsers = async (req, res) => {

    //get all the users from database
    await getAllUsersDb(req, res);


}


//function to create a user - signup
export const createUser = async (req, res) => {

    //create user
    await createUserDb(req, res);
}

//function to login
export const loginUser = async (req, res) => {

    //login user
    await loginUserDb(req, res);

}

//function to transfer balance
export const transfer = async (req, res) => {


    //transfer amount
    await transferDb(req, res);
}

