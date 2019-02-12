import React from 'react'
import axios from 'axios'
import debounce from 'lodash/debounce'

import PackageIndex from '../packages/PackageIndex'
import PackageShow from '../packages/PackageShow'

import Auth from '../../lib/Auth'


class ProjectShow extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedPackage: null,
      error: null
    }

    this.delayedCallback = debounce(this.putProject, 1000)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleViewClick = this.handleViewClick.bind(this)
    this.handlePackageDelete = this.handlePackageDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  getProject() {
    axios.get(`/api/projects/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }))
  }

  componentDidMount() {
    this.getProject()
  }

  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      this.getProject()
    }
  }

  putProject() {
    axios.put(`/api/projects/${this.props.match.params.id}`,
      {...this.state.project},
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
      .then(res => console.log(res))
      .then(() => this.setState({editing: false}))
      .catch( err => console.log(err.errors))
  }

  handleViewClick(_package){
    document.getElementById('package-show').scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'})
    this.setState({ selectedPackage: _package })
  }

  handleAddClick(_package) {
    const index = this.state.project.packages.indexOf(_package)
    console.log(index)

    const packages = (index === -1) ? (
      this.setState({editing: true}),
      this.state.project.packages.concat(_package)
    ) : (
      this.state.project.packages
    )

    const project = {...this.state.project, packages }
    this.setState({ project })
    this.delayedCallback()
  }

  handlePackageDelete(_package) {
    const index = this.state.project.packages.indexOf(_package)

    const packages = (index !== -1) ? (
      this.setState({editing: true}),
      [
        ...this.state.project.packages.slice(0, index),
        ...this.state.project.packages.slice(index+1)
      ]
    ) : (
      this.state.project.packages
    )

    const project = {...this.state.project, packages }
    this.setState({ project })
    this.delayedCallback()
  }

  handleChange({ target: { name, value } }) {
    const project = {...this.state.project, [name]: value }
    const errors = {...this.state.errors, [name]: null }
    this.setState({ project, errors, editing: true })
    this.delayedCallback()
  }

  render() {
    if(!this.state.project) return (
      <section className="section">
        <div className="container">
          <h4 className="title is-4">Loading...</h4>
        </div>
      </section>
    )
    const { name, description, createdAt, updatedAt, packages, user } = this.state.project
    return(
      <section className="section">
        <div className="container">
          <div className="columns scroll">
            <div className="column is-half project">
              <input
                className="title is-1 input hidden-input"
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
                value={name}
                disabled={!Auth.checkAvailability(user._id)}
              />
              <textarea
                className="textarea hidden-input"
                name="description"
                onChange={this.handleChange}
                value={description}
                disabled={!Auth.checkAvailability(user._id)}
              >
              </textarea>
              <section className="section">
                <h2 className='title is-5'>Installed packages</h2>
                {packages.length === 0 && <div>no packages yet</div>}
                {packages.map(packageUnit =>
                  <div
                    className="tag"
                    key={packageUnit._id}
                    id={packageUnit._id}>
                    {packageUnit.name}
                    {Auth.checkAvailability(user._id) && <button
                      className="delete is-small"
                      onClick={() => this.handlePackageDelete(packageUnit)}>
                    </button>}
                  </div>
                )}
              </section>
              <hr />
              <div>Created at: {createdAt.split('T')[0]}</div>
              <div>Updated at: {updatedAt.split('T')[0]}</div>
            </div>
            <div className="column is-half">
              <PackageIndex handleAddClick={this.handleAddClick} packages={this.state.project.packages} handleViewClick={this.handleViewClick} userId = {this.state.project.user._id}/>
            </div>
            <div id="package-show" className="column is-half">
              <PackageShow
                selectedPackage={this.state.selectedPackage} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ProjectShow
