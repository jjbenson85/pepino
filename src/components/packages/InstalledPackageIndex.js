import React from 'react'

import axios from 'axios'
// import Auth from '../../lib/Auth'
//
// import SearchBar from '../common/SearchBar'
import PackageCard from './PackageCard'
import debounce from 'lodash/debounce'

class PackageIndex extends React.Component{
  constructor(){
    super()
    this.state = {
      error: false
    }
    this.returnData = this.returnData.bind(this)
    this.handleKeywordClick = this.handleKeywordClick.bind(this)
    this.delayedCallback = debounce(this.searchPackages, 250)
  }
  searchPackages(){
    // if(!this.state.searchValue) return
    // const that = this
    // const url = '/api/packages/search/'+this.state.searchValue
    // console.log('handleSearchSubmit', url)
    // axios
    //   .get(url)
    //   .then((searchData) => {
    //     const packages = searchData.data
    //     that.setState({ packages, error: false})
    //   })
    //   .catch(function (error) {
    //     if (error.response) {
    //       this.setState({error: true})
    //     }
    //   })
    console.log('feature not yet implemented')

  }

  handleKeywordClick(keyword){
    this.setState({searchValue: `keywords:${keyword}`})
    this.delayedCallback()
    // this.props.packageShowScroll()
    setTimeout(function () {
      document.getElementById('package-index').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
    }, 250)
  }

  getPackagesData(){
    const arr = this.props.packages.map( (p)=> p.name )
    axios.post('/api/packages/multi',{
      names: arr
    })
      .then( res =>{
        this.setState({ packages: res.data})
      })
      .catch((err)=>console.log(err.message))
  }

  componentDidMount(){

    this.getPackagesData()
  }

  getUsedPackagesIds() {
    return this.props.packages.map((_package)=> _package._id)

  }

  returnData(searchData){
    if(searchData===500) {
      this.setState({error: true})
      return
    }
    const packages = searchData.data
    this.setState({ packages, error: false})
  }

  render(){
    this.getUsedPackagesIds()
    return(
      <section className='package-index'>
        {/*<SearchBar url='/api/packages/search' returnData={this.returnData}/>*/}
        <div>
          {this.state.error &&
          <div className="card">
            <div className='card-header'>
              <div className="card-header-title">Server Error</div>
            </div>
          </div>}
          {this.state.packages && this.state.packages.map( (_package,i)=>
            <PackageCard
              handleKeywordClick={this.handleKeywordClick}
              key={i}
              package={_package}
              handleAddClick={this.props.handleAddClick}
              handleViewClick={this.props.handleViewClick}
              userId={this.props.userId}
              getUsedPackagesIds={()=>this.getUsedPackagesIds()}
            />
            /*<div key={i} className='card'>
              <div className='card-header'>
                <div className="media">
                  <div className="media-left">
                    {_package.icon &&<div className="">
                      <div className="comment-image level-item">
                        <figure className="image" style={{ backgroundImage: `url(${_package.icon})` }} />
                      </div>
                    </div>}
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{_package.name}</p>
                    <p className="subtitle is-6">{_package.version}</p>
                  </div>
                </div>
              </div>
              <div className='card-content'>
                <div className="field is-grouped is-grouped-multiline">
                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">version</span>
                      <span className="tag is-info">{_package.version}</span>
                    </div>
                  </div>
                  {_package.comments && <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">comments</span>
                      <span className="tag is-success">{_package.comments.length}</span>
                    </div>
                  </div>}
                  {!_package.comments && <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">comments</span>
                      <span className="tag is-success">0</span>
                    </div>
                  </div>}
                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">downloads</span>
                      <span className="tag is-warning">{Math.round(_package.downloadsCount/1000)}k</span>
                    </div>
                  </div>
                </div>
                <div className='content'><blockquote className='is-medium'>{_package.description}</blockquote></div>
                {_package.keywords && <div className="tags level-item " >{_package.keywords.map( (keyword,j)=> <div key={j} className="tag is-primary">{keyword}</div>)}</div>}
              </div>
              <div className="card-footer">
                <div className="card-footer-item buttons has-addons is-fullwidth">
                  <button
                    className="button is-success is-outlined "
                    name="package"
                    value={_package._id}
                    onClick={() => this.props.handleAddClick(_package)}
                    disabled={!Auth.checkAvailability(this.props.userId) || this.getUsedPackagesIds().includes(_package._id)}
                  >
                    +Add to project
                  </button>
                  <button
                    className="button is-info is-outlined"
                    name='viewPackage'
                    value={_package._id}
                    onClick={() => this.props.handleViewClick(_package)}
                  >
                  View Details
                  </button>
                </div>

              </div>
            </div>*/
          )}
        </div>
      </section>
    )
  }
}

export default PackageIndex
