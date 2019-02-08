function errorHandler( err, req, res, next ){
  console.log(err)

  //Mongoose validation error
  if(err.name === 'ValidationError'){
    const errors={}

    if(err.code ==='ENOENT'){
      return res.sendStatus(404)
    }
    
    //Get the keys of the error and just keep the messages
    for(const key in err.errors){
      errors[key] = err.errors[key].message
    }

    //Return 422 and just error messages
    res.status(422).json(errors)
  }

  //All other errors
  res.status(500).json(err.message)

  next(err)
}

module.exports = errorHandler
