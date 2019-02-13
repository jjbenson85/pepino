import React from 'react'
import axios from 'axios'

import ProjectCard from './ProjectCard'

class ProjectIndex extends React.Component {
  constructor() {
    super()

    this.state = {
    }
  }

  componentDidMount() {
    axios.get('/api/projects/')
      .then(res => this.setState({ projects: res.data }))
  }

  render() {
    if (!this.state.projects) return null
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.projects.map(project => {
              if (project.visible) {
                return (
                  <div key={project._id} className="column is-one-quarter">
                    {this.state.projects.length > 0 &&
                      <ProjectCard
                        project = {project}
                      /> }
                    {!this.state.projects.length > 0 && <div>No projects have been added </div> }
                  </div>
                )
              }
            }
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default ProjectIndex
