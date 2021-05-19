import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

const signUp = async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    // password hashing using bcrypt
    const hashed = await bcrypt.hash(password, 10);
    try {
        const user = await models.User.create({
            username,
            email,
            password: hashed
        });
        return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    } catch (err) {
        console.log(err);
        throw new Error('Error creating account');
    }
}

const signIn = async (parent, { username, email, password }, { models }) => {
    if (email) {
        email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
        $or: [{ email }, { username }]
    });
    if (!user) {
        throw new AuthenticationError('Error signing in');
    }
    // validate password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new AuthenticationError('Error signing in');
    }
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
}

const createMessage = async (parent, { body, sender, group }, { req, models, pubsub }) => {
    if (!req.isAuth) {
        throw new Error('Unauthorized Access !')
    }
    const createdMessage = await models.Messages.create({ body, sender, group })
    if (createdMessage) {
        // stream the data to response
        pubsub.publish('messages', {
            messages: { body, sender, group }

        })
    }

    return createdMessage
}

export default { signIn, signUp, createMessage }