import React from 'react'

import axios from 'axios'


class PackageIndex extends React.Component{
  constructor(){
    super()
    this.state = {

    }
  }

  getPackagesData(){
    axios.get('/api/packages')
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



  render(){
    if(!this.state.packages) return null
    this.getUsedPackagesIds()
    return(
      <section className='package-index'>
        <div>
          {this.state.packages.map( (_package,i)=>
            <div key={i} className='card'>
              <div className='card-header'>
                {_package.icon &&<div className="card-image">
                  <figure className="image is-4by3">
                    <img src={_package.icon} alt={_package.name} />
                  </figure>
                </div>}
                <h2 className="card-header-title" >{_package.name}</h2>
                <div className="field is-grouped is-grouped-multiline">
                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">version</span>
                      <span className="tag is-info">{_package.version}</span>
                    </div>
                  </div>

                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">comments</span>
                      <span className="tag is-success">{_package.comments.length}</span>
                    </div>
                  </div>

                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">downloads</span>
                      <span className="tag is-primary">{Math.round(_package.downloadsCount/1000)}k</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-content'>
                <div className="buttons has-addons is-fullwidth">
                  <button
                    className="button is-success is-outlined "
                    name="package"
                    value={_package._id}
                    onClick={() => this.props.handleAddClick(_package)}
                    disabled={this.getUsedPackagesIds().includes(_package._id)}
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
                <div className='content'><blockquote className='is-medium'>{_package.description}</blockquote></div>
                <div className="tags level-item " >{_package.keywords.map( (keyword,j)=> <div key={j} className="tag is-primary">{keyword}</div>)}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }


}

export default PackageIndex
