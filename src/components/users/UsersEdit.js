import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

import UsersEditForm from './UsersEditForm'

class UsersEdit extends React.Component{

  constructor(){
    super()
    this.state = {
      data: {},
      error: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/users/${Auth.getUserID()}`)
      .then( res =>{
        const {email, username, bio, image} = res.data
        this.setState({ data: {email, username, bio, image}})
      })
      .catch((err)=>console.log(err.message))
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    this.setState({data})
  }

  handleSubmit(e){
    e.preventDefault(e)
    axios.put(`/api/users/${Auth.getUserID()}`, this.state.data,
      {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push(`/users/${Auth.getUserID()}`))
      .catch((err)=> this.setState({ error: err.response.data }))
  }

  render(){
    console.log(!this.state.data.email)
    if(!this.state.data.email) return null
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <UsersEditForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                data={this.state.data}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UsersEdit
