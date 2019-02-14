import React from 'react'
import axios from 'axios'
import debounce from 'lodash/debounce'
import Textarea from 'react-textarea-autosize'

import PackageIndex from '../packages/PackageIndex'
import InstalledPackageIndex from '../packages/InstalledPackageIndex'
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
    this.handleTabClick = this.handleTabClick.bind(this)
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

  handleTabClick(e, val){
    {this.setState({tab: val})}
  }

  handleTagClick(_package){
    console.log('SCROLL',_package.name)
    this.setState({ selectedPackage: _package, tab: 'installed' })
    setTimeout(function () {
      document.getElementById(_package.name).classList.add('glow')
      document.getElementById('package-show').scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'})
    }, 100)
    setTimeout(function () {
      const el = document.getElementById(_package.name)
      el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
      setTimeout(function () {
        el.classList.remove('glow')
      }, 1000)
    }, 500)
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
    console.log(this.state.project)
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const _value = name === 'visible' ? !this.state.project.visible : value
    const project = {...this.state.project, [name]: _value }
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
    const { name, description, createdAt, updatedAt, packages, user, visible, comments, _id } = this.state.project
    const loggedIn = Auth.checkAvailability(user._id)
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
                readOnly={!loggedIn}
              />
              <Textarea
                className="textarea hidden-input"
                name="description"
                placeholder="description"
                onChange={this.handleChange}
                value={description}
                readOnly={!loggedIn}
              />
              <section className="box">
                <h2 className='title is-5'>Installed packages</h2>
                {packages.length === 0 && <div>no packages yet</div>}
                <div className="tags">
                  {packages.map(_package =>
                    <div
                      className="tag"
                      key={_package._id}
                      id={_package._id}
                      onClick={()=> this.handleTagClick(_package)}
                    >
                      {_package.name}
                      {loggedIn && <button
                        className="delete is-small"
                        onClick={() => this.handlePackageDelete(_package)}>
                      </button>}
                    </div>
                  )}
                </div>
              </section>
              <section className="section visible">
                <div className="control">
                  <strong>Visible?</strong>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="visible"
                      checked={JSON.parse(visible)=== true}
                      onChange={this.handleChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </section>
              <hr />
              <div className="columns scroll">
                <div className="column">Created at: {createdAt.split('T')[0]} </div>
                <div className="column">Updated at: {updatedAt.split('T')[0]}</div>
              </div>
            </div>
            <div className="column is-half package-column">
              <div className="card is-fullheight">
                <div className="tabs is-boxed">
                  <ul>
                    {loggedIn&&<li className={this.state.tab==='search'? 'is-active': ''} ref={el => this.searchTab = el} onClick={(e)=>this.handleTabClick(e,'search')} >
                      <a>Search</a>
                    </li>}
                    <li className={this.state.tab==='installed'? 'is-active': ''} ref={el => this.installedTab = el} onClick={(e)=>this.handleTabClick(e,'installed')} >
                      <a className='level'>
                        <div className='level-item'>Installed</div>
                        <div className='level-right'>
                          <div className="level-item tag is-primary">{packages.length}</div>
                        </div>
                      </a>
                    </li>
                    <li className={this.state.tab==='comments'? 'is-active': ''} ref={el => this.commentTab = el} onClick={(e)=>this.handleTabClick(e,'comments')} >
                      <a className='level'>
                        <div className='level-item'>Comments</div>
                        <div className='level-right'>
                          <div className="level-item tag is-primary">{comments.length}</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-content">
                  {(this.state.tab==='comments')&&<div className="">
                    <CommentInput postCommentUrl={`/api/projects/${_id}/comments`} updateThread={this.getProject}/>
                    {comments.map((comment, i)=><CommentCard key={i} comment={comment} />)}
                  </div>}
                  {(this.state.tab==='installed')&&
                  <InstalledPackageIndex
                    handleAddClick={this.handleAddClick}
                    packages={packages}
                    handleViewClick={this.handleViewClick}
                    userId = {this.state.project.user._id}/>}
                  {(this.state.tab==='search')&&
                  <PackageIndex
                    handleAddClick={this.handleAddClick}
                    packages={this.state.project.packages}
                    handleViewClick={this.handleViewClick}
                    userId = {this.state.project.user._id}/>}
                </div>
              </div>
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
