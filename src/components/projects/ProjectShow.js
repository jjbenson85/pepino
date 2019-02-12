import React from 'react'
import axios from 'axios'

import PackageIndex from '../packages/PackageIndex'

import Auth from '../../lib/Auth'


class ProjectShow extends React.Component {
  constructor() {
    super()

    this.state = {
      edited: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/projects/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }))
  }

  handleSaveClick(){

    axios.put(`/api/projects/${this.props.match.params.id}`,
      {...this.state.project},
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
      .then(res => console.log(res))
      .catch( err => console.log(err.errors))
  }
  handleClick(_package) {
    const index = this.state.project.packages.indexOf(_package)
    console.log(this.state.project.packages.indexOf(_package))

    const packages = (index === -1) ? (
      this.state.project.packages.concat(_package)
    ) : (
      this.state.project.packages
      // [
      //   ...this.state.project.packages.slice(0, index),
      //   ...this.state.project.packages.slice(index+1)
      // ]
    )

    const project = {...this.state.project, packages }
    this.setState({ project })
  }

  render() {
    if(!this.state.project) return (
      <section className="section">
        <div className="container">
          <h4 className="title is-4">Loading...</h4>
        </div>
      </section>
    )
    const { name, description, createdAt, updatedAt, packages } = this.state.project
    const createdDate =new Date(createdAt).toLocaleString()
    const updatedDate =new Date(updatedAt).toLocaleString()
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter project">
              <h1 className="title is-1">{name}</h1>
              <button
                className="button is-danger is-outlined is-fullwidth "
                name="save"
                onClick={this.handleSaveClick}>Save Project</button>
              <div>{description}</div>
              <section className="section">
                <div className="container">
                  <h2 className='title is-5'>Installed packages</h2>
                  {packages.length === 0 && <div>no packages yet</div>}
                  {packages.map(packageUnit =>
                    <div key={packageUnit._id}>{packageUnit.name}</div>
                  )}
                </div>
              </section>
              <hr />
              <div>Created at: {createdDate}</div>
              <div>Updated at: {updatedDate}</div>
            </div>
            <div className="column is-half">
              <PackageIndex handleClick={this.handleClick}/>
            </div>
            <div className="column">
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ProjectShow
