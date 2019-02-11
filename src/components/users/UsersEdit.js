import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

import UsersEditForm from './UsersEditForm'

class UsersEdit extends React.Component{

  constructor(){
    super()
    this.state = {
      data: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/users/${Auth.getUserID()}`)
      .then( res =>{
        this.setState({ data: res.data})
      })
      .catch((err)=>console.log(err.message))
  }
  
  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    this.setState({data})
  }

  handleSubmit(e){
    e.preventDefault(e)
  }



  render(){
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <UsersEditForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UsersEdit
