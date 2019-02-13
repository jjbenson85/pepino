import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({project, handleDelete, logged}) => {
  const {_id, name, description, updatedAt} = project
  return(
    <div className="card projectCard">
      <Link to={`/projects/${_id}`}>
        <div className="card-header">
          <h4 className="card-header-title">{name.length > 23 ? name.substr(0, 23) + '...' : name}</h4>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="description">{description && description.length > 150 ? description.substr(0, 150) + '...' : description}</p>
            <hr />
            <p className="is-small">Last updated: {updatedAt.split('T')[0]}</p>
          </div>
        </div>
      </Link>
      {logged && <footer className="card-footer">
        <a href={`/projects/${_id}`} className="card-footer-item">Edit</a>
        <a onClick={() => handleDelete(_id)} className="card-footer-item">Delete</a>
      </footer>}
    </div>
  )
}

export default ProjectCard
