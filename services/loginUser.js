//function to login
import {User} from "../models/user.js";
import bcrypt from "bcryptjs";


//function to login
export const loginUserDb = async (req, res) => {

    const email = req.body.email;

    const password = req.body.password;

    console.log(email, password);


    //fetching the user from db based on email
    const user = await User.findOne({
        email: email
    });

    console.log(user);

    //if user does not exists
    if (!user) {

        return res.status(400).send({

            msg: 'User does not exist'
        })
    }

    //compare password sent in request body and database
    const result = await bcrypt.compare(password, user.password);

    console.log(result);

    //if password does not match
    if (!result) {

        //send response
        return res.status(400).send({

            msg: 'Incorrect username/password'
        })
    }

    //send response
    return res.status(400).send('Logged in')
}
