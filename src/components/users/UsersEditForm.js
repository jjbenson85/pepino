import React from 'react'

import ReactFilestack from 'filestack-react'

const UsersEditForm  = ({ data, handleChange, handleSubmit, error, status }) =>  {
  const{email, username, bio, image} = data
  return(
    <form onSubmit={handleSubmit}>
      <div className="field" >
        <label className="label">User Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="username" name="username" onChange={handleChange} value={username || ''}/>
        </div>
        {error.username && <small className="help is-danger">{error.username}</small>}

      </div>
      <div className="field">
        <label className="label">Email Address</label>
        <div className="control">
          <input className="input" type="text" placeholder="email" name="email" onChange={handleChange} value={email || ''}/>
        </div>
        {error.email && <small className="help is-danger">{error.email}</small>}
      </div>

      <div className="field">
        <label className="label">Image</label>
        <img className="image profile" src={image || 'http://interreligio.unistra.fr/wp-content/uploads/2017/07/profil-vide.png'} alt={`image of user ${username}`} />


        <div className="control">
          <ReactFilestack
            apikey={ `${process.env.FILE_STACK_KEY}` }
            mode={'pick'}
            onSuccess={(res) => {
              handleChange({
                target: {
                  name: 'image',
                  value: res.filesUploaded[0].url
                }})
            }}
            onError={(e) => console.log(e)}
            buttonText={'Add An Image'}
            buttonClass={'button is-rounded is-skew'}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Your Bio</label>
        <div className="control">
          <textarea className="textarea has-fixed-size" type="text" placeholder="bio" name="bio" onChange={handleChange} value={ bio || ''}/>

        </div>
      </div>

      <div className="field">
        {status && <button className="button is-primary home-button is-skew" >Submit</button>}

      </div>
    </form>
  )

}

export default UsersEditForm
