import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({project}) => {
  const {_id, name, image, description, updatedAt} = project
  return(
    <Link to={`/projects/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{name}</h4>
        </div>
        {image && <div className="card-image">
          <figure className="image">
            <img src={image} alt={name} />
          </figure>
        </div>}
        <div className="card-content">
          <div className="content">
            {description}
            <hr />
            Last updated: {updatedAt.split('T')[0]}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
