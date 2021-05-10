const logger = (request, response, next) => {
  console.log('Method')
  console.log(request.method)
  console.log('Path')
  console.log(request.path)
  console.log('Body')
  console.log(request.body)
  console.log('- - - - -')
  next()
}

module.exports = logger
