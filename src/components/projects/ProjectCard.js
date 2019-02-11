import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({projects}) => {

  return(
    <div className="columns is-multiline">
      {projects.map(project =>
        <div key={project._id} className="column is-one-third">
          <Link to={`/projects/${project._id}`}>
            <div className="card">
              <div className="card-header">
                <h4 className="card-header-title">{project.name}</h4>
              </div>
              {project.image && <div className="card-image">
                <figure className="image">
                  <img src={project.image} alt={project.name} />
                </figure>
              </div>}
              <div className="card-content">
                <div className="content">
                  {project.description}
                  <hr />
                  Last updated: {project.updatedAt}
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProjectCard
