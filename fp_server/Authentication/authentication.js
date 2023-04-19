const request = require('request');
const router = require('../AuthRoutes/authRoutes');

const authenticateUser = async (req, res, next) => {


  const currentTime = new Date().getTime();

  const sessionExpirationTime = currentTime - req.session.cookie.sessioncreated; // Convert minutes to milliseconds

  console.log("Should be out : ", (process.env.SESSIONEXPIRETIMEINMINUTES * 60 * 1000), " Difference : ", sessionExpirationTime)

  if ((process.env.SESSIONEXPIRETIMEINMINUTES * 60 * 1000) > sessionExpirationTime) {
    console.log("Session is available.")

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401).json({ message: 'Authentication token missing' });

    const appToken = process.env['FACEBOOK_APP_ID'];
    const url = `https://graph.facebook.com/debug_token?input_token=${appToken}&access_token=${token}`;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        next()
      } else {
        res.send({status : response.statusCode, "message":"Invalid user"});
      }
    });
  } else {
    console.log("Session has been expired.")
    req.session.destroy(err => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('connect.sid'); // clear the session cookie
        res.send({status:401, message: "Session Expired" })
      }
    });

  }
}
module.exports = authenticateUser;
