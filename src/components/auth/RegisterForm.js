import React from 'react'

const Register  = ({ data, handleChange, handleSubmit, changeState }) =>  {
  const{email, username, password, passwordConfirmation} = data

  return(
    <form onSubmit={handleSubmit} name="register">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="Username" name="username" onChange={handleChange} value={username || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" placeholder="Email" name="email" onChange={handleChange} value={email || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" placeholder="Password" name="password" onChange={handleChange} value={password || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Password Confirmation</label>
        <div className="control">
          <input className="input" type="password" placeholder="Password Confirmation" name="passwordConfirmation" onChange={handleChange} value={passwordConfirmation || ''}/>
        </div>
      </div>
      <div className="field">
        <button className="button is-primary home-button" >Register</button>
        <button className="button is-primary home-button" onClick={changeState}>Already a User</button>
      </div>
    </form>
  )

}

export default Register
