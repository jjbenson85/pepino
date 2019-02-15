import React from 'react'

const UserResult = ({ data }) => {
  const {username, image, email} = data
  let {bio} = data
  if(bio && bio.length > 60) bio = bio.substring(0,80)+'.........'
  return(
    <div className="card usersearch-result">
      <header className="card-header">
        <div className="card-header-title is-4">
          <p className="title is-4">{username}</p>
        </div>
      </header>
      <div className="card-content">
        <div className="content">
          {/*<div className="card-image">
            <figure className="image">
              <img className="image profile" src={image || 'http://interreligio.unistra.fr/wp-content/uploads/2017/07/profil-vide.png'} alt={'hello'} />
            </figure>
          </div>*/}
          {bio || ' '}
          <div className="user-card-image">
            <figure className="image" style={{ backgroundImage: `url(${image})` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserResult
