import React from 'react'
import Auth from '../../lib/Auth'


const UsersProfile  = ({ username, email, bio, image, changeState, status}) =>  {

  return(
    <div className="field" >
      <div className="profileImage">
        <img className="image profile" src={image || 'http://interreligio.unistra.fr/wp-content/uploads/2017/07/profil-vide.png'} alt={`image of user ${username}`} />
      </div>
      <div className="profileBio">
        <h1>User name: {username}</h1>
        <p>Email: {email}</p>
        <p>{bio}</p>
      </div>

      <div>
        {status &&  <button className="button is-primary home-button is-skew" onClick={changeState}>Edit Profile</button>}
        {!status && Auth.isAuthenticated() &&<button className="button is-primary home-button" >Follow user</button>}
      </div>
    </div>

  )
}

export default UsersProfile
