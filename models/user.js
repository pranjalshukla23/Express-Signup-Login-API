//mongoose
import mongoose from 'mongoose';

//create a schema
const UserSchema = mongoose.Schema({

    name: {

        type: String,
        required: true,
        minLength: 6,
    },

    email: {

        type: String,
        required: true,
        unique: true,
        minLength: 6
    },

    password: {

        type: String,
        required: true,
        minLength: 6
    },

    balance: {

        type: Number,
        default: 100
    }
}, {
    collection: 'users'
});

//creating a model from schema and exporting it
export const User = mongoose.model('User', UserSchema);