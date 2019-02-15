import React from 'react'

import axios from 'axios'
import PackageCard from './PackageCard'

class PackageIndex extends React.Component{
  constructor(){
    super()
    this.state = {
      error: false
    }
    this.returnData = this.returnData.bind(this)
  }

  getPackagesData(){
    const arr = this.props.packages.map( (p)=> p.name )
    console.log('arr',arr)
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
