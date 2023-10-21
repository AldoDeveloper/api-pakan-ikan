
function errorHandlerApi(err, req, res, next) {
   res.status(500).json({
     type: "server error",
     message: err.message,
     code: 500
   })
}

module.exports = { errorHandlerApi }