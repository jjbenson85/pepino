import React from 'react'
import axios from 'axios'

// import Auth from '../../lib/Auth'

import ProjectForm from './ProjectForm'

class ProjectNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = {...this.state.data, [name]: value }
    const error = null
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/projects', this.state.data, {
        // headers: { Authorization: `Bearer ${Auth.getToken()}` }
        headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzVmNGNlN2RmZGIzNWFjZTAwZjJmNjAiLCJpYXQiOjE1NDk3NDk0ODQsImV4cCI6MTU0OTc3MTA4NH0.ZxT6DEnhpeG7whP9b9CgW9lzv9Ol3fO40QCfbnff_1w' }
      })
      .then(() => this.props.history.push('/project'))
      .catch(() => this.setState({ error: 'An error occured' }))
  }



  render() {
    return(
      <main className="section">
        <div className="container">
          <h2 className="title">New Project</h2>
          {this.state.error && <div className="notification is-danger">{this.state.error}</div>}
          <ProjectForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </main>
    )
  }
}

export default ProjectNew
