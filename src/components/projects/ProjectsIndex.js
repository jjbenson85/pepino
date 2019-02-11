import React from 'react'
import axios from 'axios'

import ProjectForm from './ProjectForm'
import ProjectCard from './ProjectCard'

class ProjectsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      projects: null,
      addProject: false,
      data: {},
      refreshProjectList: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    axios.get('/api/projects')
      .then(res => this.setState({ projects: res.data }))
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
        // headers: { Authorization: `Bearer ${Auth.getToken()}` }
        headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzVmNGNlN2RmZGIzNWFjZTAwZjJmNjAiLCJpYXQiOjE1NDk4Nzk0NDIsImV4cCI6MTU0OTkwMTA0Mn0.h9BSLlB2-RUita9mrwkOTkDwhcFz9B9AmD8a5DXDuJk' }
      })
      // .then(() => this.props.history.push('/projects'))
      .then(() => this.setState({addProject: false, refreshProjectList: !this.state.refreshProjectList}))
      .catch(() => this.setState({ error: 'An error occured' }))
  }

  render() {
    if(!this.state.projects) return (
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
          <ProjectCard projects ={this.state.projects}/>
        </div>
      </section>
    )
  }
}

export default ProjectsIndex
