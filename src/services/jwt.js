import jwt from 'jsonwebtoken';

const verifyJwt = (req, res, next) => {
    if (req?.headers?.authorization) {
        const decodedToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.isAuth = decodedToken ? true : false
    }
    else {
        req.isAuth = false;
    }
    next()
}

const verifyJwtForSubscriptions = (connection) => {
    if (connection?.context?.authorization) {
        const decodedToken = jwt.verify(connection.context.authorization, process.env.JWT_SECRET);
        connection.isAuth = decodedToken ? true : false
    }
    else {
        connection.isAuth = false;
    }
    return connection.isAuth
}

export { verifyJwt, verifyJwtForSubscriptions };