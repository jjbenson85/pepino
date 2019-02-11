import React from 'react'

const Register  = ({ data, handleChange, handleSubmit }) =>  {
  console.log(data)
  return(
    <form onSubmit={handleSubmit} name="register">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="Username" name="username" onChange={handleChange} value={data.username || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" placeholder="Email" name="email" onChange={handleChange} value={data.email || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Password Confirmation</label>
        <div className="control">
          <input className="input" type="password" placeholder="Password Confirmation" name="passwordConfirmation" onChange={handleChange} value={data.passwordConfirmation || ''}/>
        </div>
      </div>
      <div className="field">
        <button className="button is-primary home-button" >Register</button>
      </div>
    </form>
  )

}

export default Register
