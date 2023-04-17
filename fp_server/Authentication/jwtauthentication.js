const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  if (req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401)
    console.log("Token : ",token)
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      console.log("JWT data : ",data)
      if (err || data.email !== req.body.email) {
        return res.sendStatus(403)
      }
      console.log("NEXT()")
      next();
    });
  }
}
