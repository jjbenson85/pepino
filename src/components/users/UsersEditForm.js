import React from 'react'


const UsersEditForm  = ({ data, handleChange, handleSubmit }) =>  {
  const{email, username, bio, image} = data
  return(
    <form onSubmit={handleSubmit}>
      <div className="field" >
        <label className="label">User Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="username" name="username" onChange={handleChange} value={username || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Email Address</label>
        <div className="control">
          <input className="input" type="text" placeholder="email" name="email" onChange={handleChange} value={email || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Image</label>
        <div className="control">
          <input className="input" type="text" placeholder="image" name="image" onChange={handleChange} value={image || ''}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Your Bio</label>
        <div className="control">
          <textarea className="textarea has-fixed-size" type="text" placeholder="bio" name="bio" onChange={handleChange} value={ bio || ''}/>

        </div>
      </div>

      <div className="field">
        <button className="button is-primary home-button" >Submit</button>
      </div>
    </form>
  )

}

export default UsersEditForm
