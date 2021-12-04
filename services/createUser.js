import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User} from "../models/user.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

//use .env file
dotenv.config();


const jwt = jsonwebtoken;

//function to create a user - signup
export const createUserDb = async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;


    //creating a json web token by providing payload and secret key
    const token = jwt.sign({
        password
    }, process.env.SECRET_KEY);


    console.log(token);


    //hasing password synchronously

    //generate salt
    const salt = bcrypt.genSaltSync(10);

    //hash the password
    const hashedPassword = bcrypt.hashSync(password, salt);


    console.log(name, password, email, hashedPassword);

    //creating a record
    const user = new User({

        name: name,
        password: hashedPassword,
        email: email
    })

    try {

        //saving to database
        const response = await user.save();
        console.log(response);

        //if error
    } catch (error) {

        console.log(error.message);

        //sending response
        return res.status(400).send({

            msg: error.message
        })
    }


    //creating transporter to define sending configuration
    const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {

            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }

    });

    //defining mail
    const mailOptions = {

        from: 'pranjalshukla23@gmail.com',
        to: email,
        subject: 'Verification Mail',
        text: 'You have signed up successfully'
    }

    //sending mail
    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {

            console.log(error)
        } else {

            console.log('Mail sent: ', info.response);
        }
    })

    //sending response
    res.status(200).send({

        msg: 'You have signed up successfully',
        token: token
    });
}