// const login = require('../models/login.model');
const gym = require('../models/gym.model');
const AppError = require('../utils/app-error.utils');
const { HTTP_STATUS_CODE } = require('../utils/constants.utils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECERET_JWT_TOKEN = 'TERIAANKHONKINAMKEENMASTIYAANTERIHANSIKIBEPARWAAHGUSTAKHIYAANJABTAKHAIJAAN'

authenticateLogin = async (req, res, next) => {
    try {
        try {

            const { username, password} = req.body;  
            // const superAdminLogin = await login.findOne({username});
            const superAdminLogin = '';
            const gymLogin = await gym.findOne({ gymUsername: username});

            const passwordCompare = await bcrypt.compare(password, superAdminLogin?.password || gymLogin?.gymPassword );
            
            if( superAdminLogin || gymLogin ){
                if(passwordCompare){
                    const data = {
                        user:{
                            id: superAdminLogin?._id || gymLogin?._id
                        }
                    }
                    
                    const authToken = await jwt.sign(data,SECERET_JWT_TOKEN);

                    res.cookie('jwt', authToken,{
                        expires: new Date(Date.now() + 300000),
                    })

                    return res
                    .status(HTTP_STATUS_CODE.SUCCESS)
                    .header('Authorization', req.header('Authorization'))
                    .json({ data: superAdminLogin || gymLogin , authToken });                                    
                }
                else{
                    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({error: 'username or Password is incorrect'});
                }
            }
            else{
                return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({error: 'username or Password is incorrect'});
            }
        } catch (error) {
            throw new AppError(
                'Error occured while Logging In',
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            );
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    authenticateLogin,
};
