import React from 'react'

import axios from 'axios'

import CommentCard from '../common/CommentCard'
import CommentInput from '../common/CommentInput'


class PackageShow extends React.Component{

  constructor(){
    super()
    this.state = {
      tab: 'about',
      package: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.getPackageData = this.getPackageData.bind(this)

  }

  getPackageData(){
    axios.get(`/api/packages/${this.props.selectedPackage.name}`)
      .then( res =>{
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

    if(!this.props.selectedPackage) return
    if(!prevProps.selectedPackage)  return this.getPackageData()
    if(this.props.selectedPackage.name === prevProps.selectedPackage.name) return
    this.getPackageData()
  }
  handleClick(e, val){

    // const stats = document.querySelector('#stats')
    // const about = document.querySelector('#about')
    // const comment = document.querySelector('#comment')
    this.statsTab.classList.remove('is-active')
    this.aboutTab.classList.remove('is-active')
    this.commentTab.classList.remove('is-active')
    e.currentTarget.classList.add('is-active')
    {this.setState({tab: val})}
  }

  render(){
    if(!this.state.package) return null
    const {
      name,
      description,
      author,
      links,
      license
    } = this.state.package.npms.collected.metadata
    const {comments, icon} = this.state.package
    function arrFromObj(obj){
      const arr = []
      for (const key in obj) arr.push([key, obj[key]])
      return arr
    }
    return(
      <div className="card">
        <div className="tabs is-boxed">
          <ul>
            <li
              className="is-active"
              ref={el => this.aboutTab = el}
              onClick={(e)=>this.handleClick(e,'about')}
            >
              <a>
                About
              </a>
            </li>
            <li
              ref={el => this.statsTab = el}
              onClick={(e)=>this.handleClick(e,'stats')}
            >
              <a>
                Stats
              </a>
            </li>
            <li
              ref={el => this.commentTab = el}
              onClick={(e)=>this.handleClick(e,'comments')}
            >
              <a>
                Comments

              </a>
            </li>
          </ul>
        </div>
        {(this.state.tab==='about')&&<div className="card-content">

          <div className="package-show-image">
            <figure className="image" style={{ backgroundImage: `url(${icon})` }} />
          </div>
          <p className="subtitle">
            {name}
          </p>
          <p className="title">
            {description}
          </p>
          <hr/>
          <p className="is-small">
            {`author: ${author.name}`}
          </p>
          <p className="is-small">
            {`licence: ${license}`}
          </p>
          <hr/>
        </div>}
        {(this.state.tab==='stats')&&<div className="card-content">
          STATS
        </div>}
        {(this.state.tab==='comments')&&<div className="card-content">
          <CommentInput postCommentUrl={`/api/packages/${name}`} updateThread={this.getPackageData}/>
          {comments.map((comment, i)=><CommentCard key={i} comment={comment} />)}
          {/* <CommentInput postCommentUrl={`/api/packages/${this.props.match.params.id}`}/>*/}
        </div>}
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
