const { verifyToken } = require('../controllers/auxFunctions/generateToken')
const {User} = require('../db')

const checkAuth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        if (tokenData.id) {
            next()
        } else {
            res.status(409).send({error: 'No tienes los permisos'})
            
        }
    } catch (error) {
        
    }
}

const checkAdminAuth = (roles) => async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await User.findById(tokenData.id)

        if ([].concat(roles).includes(userData.admin)) {
            next()
        } else {
            res.status(409).send({error: 'No tienes los permisos'})
            
        }
    } catch (error) {
        
    }
}


module.exports ={checkAuth, checkAdminAuth}