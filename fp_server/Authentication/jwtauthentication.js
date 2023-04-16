const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  console.log("REQ JWT: ",req.body)
  if (req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      console.log("JWT data : ",data)
      if (err || data.email !== req.body.email) {
        console.log("Before throwing error DB email ",data.email," give :",req.body.email," erro : ",err)
        return res.sendStatus(403)
      }
      console.log("NEXT()")
      next();
    });
  }
}
