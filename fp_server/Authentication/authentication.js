const request = require('request');

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401).json({ message: 'Authentication token missing' });
    
    const appToken = process.env['FACEBOOK_APP_ID'];
    const url = `https://graph.facebook.com/debug_token?input_token=${appToken}&access_token=${token}`;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            next()
        } else {
          res.status(response.statusCode).send();
        }
      });
}
module.exports = authenticateUser;
