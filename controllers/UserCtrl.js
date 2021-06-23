const {users: service} = require("../service/users")
const jwt = require('jsonwebtoken');
require("dotenv").config();




const register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
    const result = await service.getOne({email})

    if(result){
        return res.status(409).json({
            status: "error",
            code: 409,
            message: "Email in use"
        })
    }
    const {TOKEN_KEY} = process.env;        
const payload = {
    id: user._id,
}
const token = jwt.sign(payload,TOKEN_KEY)

    const data = await service.add({email, password});
    res.status(200).json({
        status: "success",
        code: 201,
        message: "Add success"
    })
    } catch (e) {
    next(e)
    }
}


const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await service.getOne({email})
        if (!user || !user.validPassword(password)){
         return   res.status(400).json({
                status: "error",
                code: 400,
                message: "Incorrect email or password",
                data: {
                    token
                }
            })
        }


        const {TOKEN_KEY} = process.env;        
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload,TOKEN_KEY)
        res.json({
            status: "success",
            code: 200,
            data: {
                token
            }
        })
    } catch (e) {
    next(e)
    }
}



module.exports = {
    register,
    login,
}