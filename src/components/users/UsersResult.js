import React from 'react'

const UserResult = ({ data }) => {
  const {username, image, email} = data
  let {bio} = data
  if(bio && bio.length > 60) bio = bio.substring(0,80)+'.........'
  return(
    <div className="card usersearch-result">
      <div className="card-image">
        <figure className="image">
          <img className="image profile" src={image || 'http://interreligio.unistra.fr/wp-content/uploads/2017/07/profil-vide.png'} alt={'hello'} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">

          </div>
          <div className="media-content">
            <p className="title is-4">{username}</p>
            <p className="subtitle is-6">{email}</p>
          </div>
        </div>

        <div className="content">
          {bio || ' '}
        </div>
      </div>

    </div>
  )
}

export default UserResult
