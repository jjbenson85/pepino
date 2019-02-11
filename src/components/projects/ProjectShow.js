import React from 'react'
import axios from 'axios'


class ProjectShow extends React.Component {
  constructor() {
    super()

    this.state = {}


  }

  componentDidMount() {
    axios.get(`/api/projects/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }))
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
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column project">
              <h1 className="title is-1">{name}</h1>
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
              <div>Created at: {createdAt}</div>
              <div>Updated at: {updatedAt}</div>
            </div>
            <div className="column">
            packages
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ProjectShow
