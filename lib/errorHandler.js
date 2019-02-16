function errorHandler( err, req, res, next ){

  if(err.code ==='ENOENT'){
    return res.sendStatus(404)
  }

  //Mongoose validation error
  if(err.name === 'ValidationError'){
    const errors={}

    //Get the keys of the error and just keep the messages
    for(const key in err.errors){
      errors[key] = err.errors[key].message
    }

    //Return 422 and just error messages
    return res.status(422).json(errors)
  }

  //All other errors
  res.status(500).json(err.message)

  next(err)
}

module.exports = errorHandler
