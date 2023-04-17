const { ObjectId } = require('mongodb');
const User = require("../models/user");
const WeatherDetail = require("../models/Weather")
const FlightDetail = require("../models/Flight")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.successtoRedirect = (req, res) => {
    res.redirect(`http://localhost:3000/user/Dashbaord?id=${req.user.id}&name=${req.user.name}`);
}

exports.fetchToken = async (req, res) => {
    if (req.body.uid.length > 0) {
        const objectId = new ObjectId(req.body.uid);
        const user = await User.find({ _id: objectId });
        const { name, accessToken, email ,userType} = user[0]
        //console.log("USER FOUND FOR TOKEN :",user)
        if (accessToken.length > 0) {
            res.json({ name, accessToken, email ,userType})
        }
    }
}

exports.login = (res) => {
    res.redirect(`http://localhost:3000/`);
}

exports.FlightDetailServer = async(req,res) =>{
    let flightdb={}
    console.log("Flight hit")
    FlightDetail.find({}).then( async (flight) => {
        //doing stuff with the user array
        if(flight.length>0){
            flightdb = flight
        }else{
            const updateflight = new FlightDetail(
                {
                    flightname: "Qatar Airlines",
                    altitude: "27000",
                    speed: "1200 knot",
                    location: "Karachi",
                    fuel:"100 litre",
                    arrivalestiamtedtime:"2 hr",
                    distance:"200 km",
                    aircraftname:"Boeing",
                }
            )
            await updateflight.save(updateflight).then(
                () => {
                    flightdb = updateflight
                }
            )
        }
        console.log("Flight hit before return : ",flightdb)
        res.send({flightdb}) 
    });
}

exports.WeatherDetailServer = async (req,res) => {
    let weatherdb = {}
    WeatherDetail.find({}).then( async (weather) => {
        //doing stuff with the user array
        if(weather.length>0){
            weatherdb =weather
        }else{
            const updateweather = new WeatherDetail(
                {
                    temperature: "32 C",
                    humidity: "79%",
                    location: "Karachi",
                    uvindex: " 0 of 10"
                }
            )
            await updateweather.save(updateweather).then(
                () => {
                    weatherdb= updateweather
                }
            )
        }
        res.send({weatherdb}) 
    });
}

function register(req, res) {
    //console.log("Request : ", request.body)
    const salt = bcrypt.genSaltSync(saltRounds);
    if (!req.body.password) {
        res.status(401).send({
            message: "Invalid Password!"
        });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newuser = new User({
        name: req.body.name.toLowerCase(),
        email: req.body.email,
        password: hashedPassword,
        userType: "Local"
    })
    //console.log("Request0 : ", newuser)
    return newuser;
}

exports.signupwithcredentials = async (req, res) => {
    const newUser = register(req, res)
    await newUser.save(newUser).then(
        () => {
            res.status(200).send({
                message: "User Registered successfully"
            })
        }
    ).catch(
        (error) => {
            res.status(500).send({
                message: error.message
            });
        }
    )
}


function isValidPassword(usergivenpassword, userdbpassword) {
    //console.log("Before bycrypt", usergivenpassword, " userdbpass :", userdbpassword)
    return bcrypt.compareSync(usergivenpassword, userdbpassword)
}

exports.signinwithcredentials = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.find({ email: email });

    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    if (!password || user.userType === "FaceBook") {
        return res.send({
            status: 401,
            message: "Password is either empty or not set",
            accessToken: null,
        });
    }
    // console.log("USER AT SIGN IN : ", user[0].password)
    // console.log("REQ :", req.body.password)

    if (!isValidPassword(req.body.password, user[0].password)) {
        return res.send({
            status: 401,
            message: "Passoword does not match",
            accessToken: null,
        });
    }
    //signing token with user id
    const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, {
        expiresIn: 86400
    });
    //responding to client request with user profile success message and access token.
    res.send({
        user: {
            id: user[0]._id,
            email: user[0].email,
            fullName: user[0].name,
            localuser: user[0].userType
        },
        status: 200,
        message: "Login successful",
        accessToken: token,
    });

}