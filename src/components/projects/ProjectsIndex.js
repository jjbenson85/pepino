import React from 'react'
import axios from 'axios'

import ProjectCard from './ProjectCard'
import SearchBar from '../common/SearchBar'

import debounce from 'lodash/debounce'



class ProjectIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      search: '',
      searched: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchProject = this.searchProject.bind(this)
    this.delayedCallback = debounce(this.searchProject, 250)
  }

  getAllProjects() {
    axios.get('/api/projects/')
      .then(res => this.setState({ projects: res.data }))
      .then(() => this.setState({searched: null}))
  }

  componentDidMount() {
    this.getAllProjects()
  }

  handleChange({target: {name, value}}){
    this.setState({...this.state, [name]: value})
    this.delayedCallback()
  }

  handleSubmit(e){
    e.preventDefault(e)
    this.searchProject()
  }

  searchProject(){
    if(this.state.search.trim() !== ''){
      axios.get(`/api/projects/search/${this.state.search.trim()}`)
        .then(res => {
          this.setState({ ...this.state, searched: res.data})
        })
        .catch((err)=>console.log(err.response.data))
    }else{
      this.getAllProjects()
    }
  }

  render() {
    if (!this.state.projects) return null
    return(
      <section className="section">
        <div className="container">
          <label className="label">Discover More Projects</label>
          <SearchBar
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            value={this.state.searchValue}
          />
          <div className="columns is-multiline">
            {!this.state.searched &&  this.state.projects.length > 0 && this.state.projects.map(project => {
              if (project.visible) {
                return (
                  <div key={project._id} className="column is-one-quarter">
                    <ProjectCard
                      project = {project}
                    />
                  </div>
                )
              }
            }
            )}

            {this.state.searched && this.state.searched.length > 0 && this.state.searched.map(project => {
              if (project.visible) {
                return (
                  <div key={project._id} className="column is-one-quarter">
                    <ProjectCard
                      project = {project}
                    />
                  </div>
                )
              }
            }
            )}

            {this.state.searched && this.state.searched.length === 0 && <div className="column">No projects have been found with this name </div> }

          </div>
        </div>
      </section>
    )
  }
}

export default ProjectIndex
