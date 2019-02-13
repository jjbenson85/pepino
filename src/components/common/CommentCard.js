import React from 'react'

const CommentCard = ({comment: {text, user}})=> {
  return(
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <div className="comment-image">
              <figure className="image" style={{ backgroundImage: `url(${user.image})` }} />
            </div>
          </div>
          <div className="media-content">
            <p className="title is-4">{user.username}</p>
          </div>
        </div>

        <div className="content">
          {text}
          <br/>
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
