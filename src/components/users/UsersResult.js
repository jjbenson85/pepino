import React from 'react'

const UserResult = ({ data }) => {
  const {username, image} = data
  return(
    <div className="card">
      <div className="card-header">
        <h4 className="card-header-title">{username}</h4>
      </div>
      <div className="card-image">
        <figure className="image">
          <img className="image profile" src={image || 'http://interreligio.unistra.fr/wp-content/uploads/2017/07/profil-vide.png'} alt={'hello'} />
        </figure>
      </div>
    </div>
  )
}

export default UserResult
