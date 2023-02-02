const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            /**
             * err : null
             * allowed boolean : true
             */
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    // Accepts credentials header
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions