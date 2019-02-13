import React from 'react'
import axios from 'axios'

import ProjectForm from './ProjectForm'
import ProjectCard from './ProjectCard'
import Auth from '../../lib/Auth'
import {withRouter} from 'react-router-dom'

class ProjectsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      addingProject: false,
      data: {},
      newProjectId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = {...this.state.data, [name]: value }
    const error = null
    this.setState({ data, error })
  }

  handleClick() {
    this.setState({ addingProject: true })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/projects', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then((res) => {
        console.log(`/projects/${res.data._id}`)
        this.props.history.push(`/projects/${res.data._id}`)
      })
      .catch(() => this.setState({ error: 'An error occured' }))
  }

  handleDelete(id) {
    axios
      .delete(`/api/projects/${id}`, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/users'))
      .catch(err => console.log(err))
  }

  render() {
    if(!this.props) return (
      <section className="section">
        <div className="container">
          <h4 className="title is-4">Loading...</h4>
        </div>
      </section>
    )
    return(
      <section className="">
        <div className="">
          {!this.state.addingProject && this.props.logged && <button onClick={this.handleClick} className="button is-primary">Add project</button>}
          {this.state.addingProject &&
            <ProjectForm
              data={this.state.data}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />}
          {!this.state.addingProject && this.props.logged && <hr /> }
          <div className="columns is-multiline">
            {this.props.projects.map(project => {
              if (project.visible || this.props.logged) {
                return (
                  <div key={project._id} className="column is-one-third">
                    {this.props.projects.length > 0 &&
                      <ProjectCard project = {project}
                        handleDelete={this.handleDelete}
                        logged={this.props.logged}/> }
                    {!this.props.projects.length > 0 && <div>No projects have been added </div> }
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

export default withRouter(ProjectsIndex)
