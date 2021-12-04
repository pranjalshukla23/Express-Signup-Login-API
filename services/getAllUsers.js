//model
import {User} from "../models/user.js";

//function to get users
export const getAllUsersDb = async (req, res) => {

    try {

        //get all the users from database
        const users = await User.find();

        console.log(users);

        //sending all the users as response
        res.status(200).json({
            users
        })


    } catch (err) {


        return res.status(400).json({

            msg: err.message
        })
    }

}
