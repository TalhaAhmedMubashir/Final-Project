var express = require('express');
var router = express.Router();
var controller = require("../Controller/controller")
var fBRouter = require("../Controller/authController");
const {verifyToken} = require('../Authentication/jwtauthentication')
const authenticateUser = require('../Authentication/authentication');
// const verifyToken = require("../Authentication/jwtauthentication")

// router.use((req, res, next) => {
//     console.log(`Request type: ${req.method}`);
//     console.log(`Request URL: ${req.originalUrl}`);
//     console.log("Header : ",req.headers['authorization'])
//     console.log("Body :",req.body)
//     next();
//   });

router.use('/auth', fBRouter);

router.get('/login',controller.login);


router.get("/success", controller.successtoRedirect);

router.post("/user/signup",controller.signupwithcredentials)
router.post("/user/signin",controller.signinwithcredentials)


router.post('/user/getToken',controller.fetchToken);

router.use('/user/weather/FaceBook' , authenticateUser)
router.post('/user/weather/FaceBook',controller.WeatherDetailServer)

router.use('/user/flight/FaceBook' , authenticateUser)
router.post('/user/flight/FaceBook',controller.FlightDetailServer)



router.use("/user/weather/Local" ,verifyToken)
router.post("/user/weather/Local" ,controller.WeatherDetailServer)

router.use("/user/flight/Local" ,verifyToken)
router.post("/user/flight/Local" ,controller.FlightDetailServer)


module.exports = router;
