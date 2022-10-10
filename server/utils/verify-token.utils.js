const jwt = require('jsonwebtoken');
const AppError = require('./app-error.utils');
const { HTTP_STATUS_CODE } = require('../utils/constants.utils');
const SECERET_JWT_TOKEN = 'TERIAANKHONKINAMKEENMASTIYAANTERIHANSIKIBEPARWAAHGUSTAKHIYAANJABTAKHAIJAAN'

module.exports = async (req, res, next) => {

    try {

        console.log(req.headers);
        const token = req.cookies;
        console.log(token);
        const verified = jwt.verify(token, SECERET_JWT_TOKEN);

        if(verified){
            console.log(verified);
            next();
        }
        else{
            throw new AppError('Token expired', HTTP_STATUS_CODE.UNAUTHORISED);
        }

    } catch (error) {
        throw new AppError('Invalid token', HTTP_STATUS_CODE.UNAUTHORISED);
    }
};
