import React from 'react'

import axios from 'axios'


class PackageShow extends React.Component{

  constructor(){
    super()
    this.state = {
    }

  }

  getPackageData(){
    console.log('get package data', this.props.selectedPackage.name)
    axios.get(`/api/packages/${this.props.selectedPackage.name}`)
      .then( res =>{
        console.log(res.data)
        this.setState({ package: res.data})
      })
      .catch((err)=>console.log(err.message))
  }

  componentDidMount(){
    // if(this.props.selectedPackage){
    //   this.getPackageData()
    // }
  }

  componentDidUpdate(prevProps){
    console.log(this.props)
    console.log(prevProps)
    if(!this.props.selectedPackage) return
    if(!prevProps.selectedPackage)  return this.getPackageData()
    if(this.props.selectedPackage.name === prevProps.selectedPackage.name) return
    this.getPackageData()
  }

  render(){
    if(!this.state.package) return null
    console.log('package', this.state.package)
    const {
      name,
      description,
      author,
      publisher,
      links,
      license
    } = this.state.package.npms.collected.metadata
    const {comments, icon} = this.state.package.pepino
    function arrFromObj(obj){
      const arr = []
      for (const key in obj) arr.push([key, obj[key]])
      return arr
    }

    return(
      <div className="card">
        <div className="card-content">
          <div className="tabs is-boxed">
            <ul>
              <li className="is-active">
                <a>
                  <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                  <span>Pictures</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
                  <span>Music</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
                  <span>Videos</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="icon is-small"><i className="far fa-file-alt" aria-hidden="true"></i></span>
                  <span>Documents</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={icon} alt="Placeholder image"/>
            </figure>
          </div>
          <p className="subtitle">
            {name}
          </p>
          <p className="title">
            {description}
          </p>
        </div>
        <footer className="card-footer-item">
          {arrFromObj(links).map( (link,i) => {
            return <p key={i} className="card-footer-item">
              <a  href={link[1]}>
                {link[0]}
              </a>
            </p>
          })}
        </footer>
      </div>
      /*<section className='card'>
        <h1 className='title is-2'>{name}</h1>
        <div className='content'>
          <blockquote className="">{description}</blockquote >
        </div>
        <p>{`author:${author.name}`}</p>
        <p>{`license:${license}`}</p>
        <p>{`publisher:${publisher.username}, ${publisher.email}`}</p>
        <h3>links:</h3>
        <ul>
          {arrFromObj(links).map( (link,i) => {
            return <li key={i}><a  href={link[1]}>{link[0]}</a></li>
          })}
        </ul>
        <h3>Comments</h3>
        <ul>
          {comments.map( (comment, i) =>
            <li key={i}>
              <p>{comment.text}</p>
              <p>{`Posted by ${comment.user.username}`}</p>
            </li>
          )}
        </ul>
      </section>*/
    )
  }
}

export default PackageShow
