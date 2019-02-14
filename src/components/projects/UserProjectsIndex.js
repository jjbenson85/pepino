import React from 'react'
import axios from 'axios'

import ProjectForm from './ProjectForm'
// import ProjectCard from './ProjectCard'
import PopulatedUserProjectColumn from './PopulatedUserProjectColumn'
import LoadingScreen from '../common/LoadingScreen'
import Auth from '../../lib/Auth'
import {withRouter} from 'react-router-dom'

class ProjectsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      addingProject: false,
      data: {},
      newProjectId: null,
      error: null
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
        this.props.history.push(`/projects/${res.data._id}`)
      })
      .catch(err =>this.setState({...this.state, error: err.response.data }))
  }

  handleDelete(id) {
    axios
      .delete(`/api/projects/${id}`, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  }

  render() {
    if(!this.props) return (
      <LoadingScreen />
    )
    return(
      <section className="section">
        <div className="">
          {!this.state.addingProject &&
            this.props.logged &&
            <div>
              <button
                onClick={this.handleClick}
                className="button is-primary">
                Add project
              </button>
              <hr />
            </div>
          }
          {this.state.addingProject &&
            <ProjectForm
              data={this.state.data}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              error={this.state.error}
            />
          }
          <PopulatedUserProjectColumn
            projects ={this.props.projects}
            handleDelete={this.handleDelete}
            logged={this.props.logged}
          />

          {this.props.projects.length === 0 && Auth.isAuthenticated() && <div>You have not added any projects</div> }
          {this.props.projects.length === 0 && !Auth.isAuthenticated() && <div>The user have not added any projects</div> }
        </div>
      </section>
    )
  }
}

export default withRouter(ProjectsIndex)
