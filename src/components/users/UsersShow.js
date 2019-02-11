import React from 'react'
import Auth from '../../lib/Auth'

import axios from 'axios'

import ProjectsIndex from '../projects/ProjectsIndex'


class UsersShow extends React.Component{

  constructor(){
    super()
    this.state = {}
  }

  componentDidMount(){
    axios.get(`/api/users/${Auth.getUserID()}`)
      .then( res =>{
        this.setState({ data: res.data})
      })
      .catch((err)=>console.log(err.message))
  }


  render(){
    if(!this.state.data) return null
    // {console.log('bego', this.state.data)}

    const {
      username,
      image,
      project,
      email,
      bio
    } = this.state.data
    return(
      <section className="section">
        <div className="container">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <img className="image profile" src={image || 'http://interreligio.unistra.fr/wp-content/uploads/2017/07/profil-vide.png'} alt={`image of user ${username}`} />
                <h1>User name: {username}</h1>
                <p>Email: {email}</p>
                <p>{bio}</p>
              </div>
              <div className="column ">
                <ProjectsIndex projects={project}/>
              </div>
            </div>
          </div>

        </div>

      </section>
    )
  }
}

export default UsersShow
