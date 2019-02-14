import React from 'react'
import axios from 'axios'
import debounce from 'lodash/debounce'

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
      tab: 'search'
    }

    this.delayedCallback = debounce(this.putProject, 1000)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleViewClick = this.handleViewClick.bind(this)
    this.handlePackageDelete = this.handlePackageDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getProject = this.getProject.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
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
    this.setState({ selectedPackage: _package })
    setTimeout(function () {
      document.getElementById('package-show').scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'})
    }, 10)
  }
  handleTagClick(_package){
    // console.log(name)
    this.setState({ selectedPackage: _package })
    setTimeout(function () {
      document.getElementById('package-show').scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'})
    }, 10)
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
    // this.searchTab.classList.remove('is-active')
    // this.commentTab.classList.remove('is-active')
    // e.currentTarget.classList.add('is-active')
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
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-9 scroll">
            <div className="column is-half project">
              <div className="card is-fullheight">


                <div>
                  <input
                    className="title is-1 input hidden-input"
                    placeholder="Name is required"
                    name="name"
                    onChange={this.handleChange}
                    value={name}
                    disabled={!Auth.checkAvailability(user._id)}
                  />
                  <textarea
                    className="textarea hidden-input"
                    name="description"
                    placeholder="description"
                    onChange={this.handleChange}
                    value={description}
                    disabled={!Auth.checkAvailability(user._id)}
                  >
                  </textarea>
                  <section className="section">
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

                          {Auth.checkAvailability(user._id) && <button
                            className="delete is-small"
                            onClick={() => this.handlePackageDelete(_package)}>
                          </button>}
                        </div>
                      )}
                    </div>
                  </section>
                  <section className="section visible">
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="visible" value={true} onChange={this.handleChange} checked={JSON.parse(visible)=== true}/>
                        <span>Visible</span>
                      </label>
                      <label className="radio">
                        <input type="radio" name="visible" value={false} onChange={this.handleChange} checked={JSON.parse(visible)=== false}/>
                        <span>Not visible</span>
                      </label>
                    </div>
                  </section>
                  <hr />
                  <div>Created at: {createdAt.split('T')[0]}</div>
                  <div>Updated at: {updatedAt.split('T')[0]}</div>
                </div>
              </div>
            </div>
            <div className="column is-half">
              <div className="card is-fullheight">
                <div className="tabs is-boxed">
                  <ul>
                    <li
                      className={this.state.tab==='search'? 'is-active': ''}
                      ref={el => this.searchTab = el}
                      onClick={(e)=>this.handleTabClick(e,'search')}
                    >
                      <a>Search</a>
                    </li>
                    <li
                      className={this.state.tab==='installed'? 'is-active': ''}
                      ref={el => this.installedTab = el}
                      onClick={(e)=>this.handleTabClick(e,'installed')}
                    >
                      <a className='level'>
                        <div className='level-item'>Installed</div>
                        <div className='level-right'>
                          <div className="level-item tag is-primary">{packages.length}</div>
                        </div>
                      </a>
                    </li>
                    <li
                      className={this.state.tab==='comments'? 'is-active': ''}
                      ref={el => this.commentTab = el}
                      onClick={(e)=>this.handleTabClick(e,'comments')}
                    >
                      <a className='level'>
                        <div className='level-item'>Comments</div>
                        <div className='level-right'>
                          <div className="level-item tag is-primary">{comments.length}</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                {(this.state.tab==='comments')&&<div className="card-content">
                  <CommentInput postCommentUrl={`/api/projects/${_id}/comments`} updateThread={this.getProject}/>
                  {comments.map((comment, i)=><CommentCard key={i} comment={comment} />)}
                  {/* <CommentInput postCommentUrl={`/api/packages/${this.props.match.params.id}`}/>*/}
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
            {this.state.selectedPackage && <div id="package-show" className="column is-half">
              {console.log('selectedPackage', this.state.selectedPackage)}
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
