import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken


//function to authenticate
export const authenticateUserDb = async (req, res) => {

    //get token passed in headers in 'authenticate' field
    // authorization : Bearer <token>
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token);

    //if token does not exist
    if (!token) {

        //sending response
        return res.status(400).send({

            msg: 'You are not authenticated'
        });

    }

    try {

        //verify the token
        const password = jwt.verify(token, process.env.SECRET_KEY);

        console.log(password);
    }

        //if token does not match
    catch (error) {

        //sending response
        return res.status(400).send({

            msg: error.message
        });

    }

    //send response
    res.status(200).send({

        msg: 'You have successfully logged in'
    })


}