
  const tokenHandler = (request:any,response:any,next:any) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token= authorization.substring(7)
      request.token=token
    }
    next()
  }
  module.exports = {
    tokenHandler,
  }