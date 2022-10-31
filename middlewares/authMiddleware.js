const jwt = require("jsonwebtoken");
const {Users} = require("../models");

module.exports = async (req, res, next) => {
    try{
        const cookie = req.headers.authorization || req.cookies

        if(!cookie){
            return res.status(400).json({ ok:false, errorMessage:"로그인 후 이용 가능합니다1111" });
        }
        const [tokenType, tokenValue] = cookie.split(' ');
        if(tokenType !== 'Bearer'){
            return res.status(400).json({ ok:false, errorMessage:"쿠키에 오류가 발생했습니다" });
        }

        const {userId} = jwt.verify(tokenValue, 'secret_dang'); // 궁금
        const user = await Users.findByPk(userId);
        res.locals.user = user;
        next()
    }catch(error){
        console.log(error);
        return res.status(400).json({ ok:false, errorMessage:"로그인 후 이용 가능합니다" });
    }
};