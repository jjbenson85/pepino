import React from 'react'
import { Link } from 'react-router-dom'

const UserInfo = ({user}) => {
  return (
    <Link to={`/users/${user._id}`}>
      <div className="user">
        <div className="projectUsername">Created by: {user.username}</div>
        <figure className="image is-48x48">
          <img src={user.image} />
        </figure>
      </div>
    </Link>
  )
}

export default UserInfo
