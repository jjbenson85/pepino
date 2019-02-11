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
      addProject: false,
      data: {},
      newProjectId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = {...this.state.data, [name]: value }
    const error = null
    this.setState({ data, error })
  }

  handleClick() {
    this.setState({ addProject: true })
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

  render() {
    if(!this.props) return (
      <section className="section">
        <div className="container">
          <h4 className="title is-4">Loading...</h4>
        </div>
      </section>
    )
    return(
      <section className="section">
        <div className="container">
          {!this.state.addProject && <button onClick={this.handleClick} className="button is-primary">Add project</button>}
          {this.state.addProject &&
            <ProjectForm
              data={this.state.data}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />}
          <hr />
          {this.props.projects.length > 0 && <ProjectCard projects ={this.props.projects}/> }
          {!this.props.projects.length > 0 && <div>No projects have been added </div> }
        </div>
      </section>
    )
  }
}

export default withRouter(ProjectsIndex)
