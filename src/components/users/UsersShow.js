import React from 'react'
import Auth from '../../lib/Auth'

import axios from 'axios'


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
    return(
      <section>
        <h1>{Auth.getUserName()}</h1>
      </section>
    )
  }
}

export default UsersShow
