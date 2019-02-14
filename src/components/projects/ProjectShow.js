import React from 'react'
import axios from 'axios'
import debounce from 'lodash/debounce'
import Textarea from 'react-textarea-autosize'

import PackageIndex from '../packages/PackageIndex'
import PackageShow from '../packages/PackageShow'

import CommentCard from '../common/CommentCard'
import CommentInput from '../common/CommentInput'

import Auth from '../../lib/Auth'


class ProjectShow extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedPackage: null,
      error: null,
      tab: 'about'
    }

    this.delayedCallback = debounce(this.putProject, 1000)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleViewClick = this.handleViewClick.bind(this)
    this.handlePackageDelete = this.handlePackageDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getProject = this.getProject.bind(this)
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
      .then(res => console.log(res.data))
      .catch( err => console.log(err.errors))
  }

  handleViewClick(_package){
    document.getElementById('package-show').scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'})
    this.setState({ selectedPackage: _package })
  }

  handleAddClick(_package) {
    const index = this.state.project.packages.indexOf(_package)
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

  handleTabClick(e, val){

    // const stats = document.querySelector('#stats')
    // const about = document.querySelector('#about')
    // const comment = document.querySelector('#comment')
    // this.statsTab.classList.remove('is-active')
    this.aboutTab.classList.remove('is-active')
    this.commentTab.classList.remove('is-active')
    e.currentTarget.classList.add('is-active')
    {this.setState({tab: val})}
  }

  render() {
    if(!this.state.project) return (
      <section className="section">
        <div className="container">
          <h4 className="title is-4">Loading...</h4>
        </div>
      </section>
    )
    const { name, description, createdAt, updatedAt, packages, user, visible, comments, _id } = this.state.project
    const loggedIn = Auth.checkAvailability(user._id)
    // console.log("bego", user)
    return(
      <section className="section">
        <div className="container is-fluid">
          <div className="columns scroll">
            <div className="column is-half project">
              <input
                className="title is-1 input hidden-input"
                placeholder="Name is required"
                name="name"
                onChange={this.handleChange}
                value={name}
                disabled={!loggedIn}
              />
              <hr className="project"/>
              <Textarea
                className="textarea hidden-input"
                name="description"
                placeholder="description"
                onChange={this.handleChange}
                value={description}
                disabled={!loggedIn}
              />
              <hr className="project"/>
              <section className="section">
                <h2 className='title is-5'>Installed packages</h2>
                {packages.length === 0 && <div className="no-package">no packages yet</div>}
                <div className="tags">
                  {packages.map(packageUnit =>
                    <div
                      className="tag"
                      key={packageUnit._id}
                      id={packageUnit._id}>
                      {packageUnit.name}
                      {loggedIn && <button
                        className="delete is-small"
                        onClick={() => this.handlePackageDelete(packageUnit)}>
                      </button>}
                    </div>
                  )}
                </div>
              </section>
              <section className="section visible">
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="visible"
                      value={true}
                      onChange={this.handleChange}
                      checked={JSON.parse(visible)=== true}
                      disabled={!loggedIn}
                    />
                    <span>Visible</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="visible"
                      value={false}
                      onChange={this.handleChange}
                      checked={JSON.parse(visible)=== false}
                      disabled={!loggedIn}
                    />
                    <span>Not visible</span>
                  </label>
                </div>
              </section>
              <hr />
              <div className="columns scroll">
                <div className="column">Created at: {createdAt.split('T')[0]} </div>
                <div className="column">Updated at: {updatedAt.split('T')[0]}</div>
              </div>
            </div>
            <div className="column is-half">
              {(this.state.tab==='comments')&&<div className="card-content">
                <CommentInput postCommentUrl={`/api/projects/${_id}/comments`} updateThread={this.getProject}/>
                {comments.map((comment, i)=><CommentCard key={i} comment={comment} />)}
                {/* <CommentInput postCommentUrl={`/api/packages/${this.props.match.params.id}`}/>*/}
              </div>}
              {(this.state.tab==='about')&&
              <PackageIndex
                handleAddClick={this.handleAddClick}
                packages={this.state.project.packages}
                handleViewClick={this.handleViewClick}
                userId = {this.state.project.user._id}/>}
            </div>
            {this.state.selectedPackage && <div id="package-show" className="column is-half">
              <PackageShow
                selectedPackage={this.state.selectedPackage}
              />
            </div>}
          </div>
        </div>
      </section>
    )
  }
}

export default ProjectShow
