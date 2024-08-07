const jwt =  require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer TOKEN"

    if (token == null) return res.status(401).json({ error: 'Token is required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;