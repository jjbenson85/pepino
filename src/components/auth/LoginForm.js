import React from 'react'


const Login  = ({ data, handleChange, handleSubmit }) =>  {

  const{email, password} = data
  return(
    <form onSubmit={handleSubmit} name="login">
      <div className="field" >
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
        <button className="button is-primary home-button" >Submit</button>
      </div>
    </form>
  )

}

export default Login
