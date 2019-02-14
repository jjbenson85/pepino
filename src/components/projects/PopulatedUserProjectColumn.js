import React from 'react'
import ProjectCard from './ProjectCard'

const PopulatedUserProjectColumn = ({projects, handleDelete, logged}) => {
  return (
    <div>
      {projects.length > 0 && <div className="columns is-multiline">
        {projects.map(project => {
          if (project.visible || this.props.logged) {
            return (
              <div key={project._id} className="column is-one-third">
                <ProjectCard
                  project = {project}
                  handleDelete={handleDelete}
                  logged={logged}
                />
              </div>
            )
          }
        }
        )}
      </div> }
    </div>
  )
}

export default PopulatedUserProjectColumn
