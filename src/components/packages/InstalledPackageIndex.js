import React from 'react'

import axios from 'axios'
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
          )}
        </div>
      </section>
    )
  }
}

export default PackageIndex
