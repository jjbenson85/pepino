import React from 'react'
const TimeStamp = ({createdAt, updatedAt}) => {
  return (
    <div className="columns timeStamp">
      <div className="column">Created at: {createdAt.split('T')[0]} </div>
      <div className="column">Updated at: {updatedAt.split('T')[0]}</div>
    </div>
  )
}

export default TimeStamp
