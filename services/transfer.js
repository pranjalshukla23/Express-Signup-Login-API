import {User} from "../models/user.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

//use .env file
dotenv.config();

//function to transfer balance
export const transferDb = async (req, res) => {

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const amount = Number(req.body.amount);

    console.log(sender, receiver, amount);


    //finding sender's record in database which matches the name
    const databaseSender = await User.findOne({

        name: sender
    });

    //fetching receiver's record from database which matches the name
    const databaseReceiver = await User.findOne({

        name: receiver
    });

    console.log(databaseSender, databaseReceiver);


    //if record of sender and receiver does not exist
    if (!databaseReceiver || !databaseSender) {

        //send response
        return res.status(400).send({

            msg: 'you are not authorised to do the transfer'
        });
    }

    //if record exist, deduct the amount from sender's balance and credit it to receiver

    //calculating new balance of sender after deduction
    const newSenderBalance = databaseSender.balance - amount;

    console.log(newSenderBalance)

    //calculating new balance of receiver after crediting amount
    const newReceiverBalance = databaseReceiver.balance + amount;

    console.log(newReceiverBalance);


    try {
        //update sender's record
        const newUser = await User.findOneAndUpdate({
            name: sender
        }, {
            balance: newSenderBalance
        });

        console.log(newUser);

        //update receiver's record
        const newReceiver = await User.findOneAndUpdate({

            name: receiver
        }, {

            balance: newReceiverBalance
        });

        console.log(newReceiver);


        //if error
    } catch (error) {

        //send response
        return res.status(400).send({

            msg: error.message
        });
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
        to: databaseSender.email,
        subject: 'Transaction confirmation Mail',
        text: `You have sent the amount successfully to recipient , The Transaction Details are as follows:
         Sender: ${databaseSender.name},
         Receiver:${databaseReceiver.name}
         amount:${amount}
         Time:${new Date().toLocaleString()}`
    }

    //sending mail after doing transaction
    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {

            console.log(error)
        } else {

            console.log('Mail sent: ', info.response);
        }
    })

    //send response
    res.status(200).json({

        sender: databaseSender.name,
        receiver: databaseReceiver.name,
        amount: amount,
        time: new Date().toLocaleString()
    })
}