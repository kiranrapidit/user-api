const jwt = require("jsonwebtoken")
let env = process.env.NODE_ENV || 'DEV'
let config = require("../config")[env]

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        res.status(401).json({
            content: {
                response: {
                    login: false,
                    error: { code: 'NA401', description: "Not Authorized" }
                }
            }
        })
        return
    }
    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            res.status(403).json({
                content: {
                    response: {
                        login: false,
                        error: { code: 'NA403', description: "Not a valid token, forbidden" }
                    }
                }
            })
            return
        }
        req.user = user
        next()
    })

}


module.exports = {
    authenticateToken
}