import React from 'react'

import axios from 'axios'


class PackageShow extends React.Component{

  constructor(){
    super()
    this.state = {}

  }

  getPackageData(){
    axios.get(`/api/packages/${this.props.match.params.name}`)
      .then( res =>{
        console.log('axios \n',res)
        this.setState({ package: res.data})
      })
      .catch((err)=>console.log(err.message))
  }

  componentDidMount(){
    console.log('didmount')
    this.getPackageData()
  }

  render(){
    if(!this.state.package) return null
    console.log('render',this.state.package)
    const {
      name,
      description,
      author,
      publisher,
      repository,
      links,
      license,
      comments
    } = this.state.package.collected.metadata
    // linksArr = 
    return(
      <section>
        <h1>Packages</h1>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{`author:${author}`}</p>
        <p>{`publisher:${publisher}`}</p>
        <h3>links:</h3>
        {}
        <h2>{/*this.state.package.name*/}</h2>
      </section>
    )
  }
}

export default PackageShow
