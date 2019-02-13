import React from 'react'
import UsersResult from './UsersResult'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'

class UsersIndex extends React.Component{
  constructor(){
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    axios.get('/api/users')
      .then(res =>{
        this.setState({ data: res.data})
      })
      .catch((err)=>console.log(err.response.data))
  }

  handleChange({target: {name, value}}){
    this.setState({...this.state, [name]: value})
  }
  handleSubmit(e){
    e.preventDefault(e)
    axios.get(`/api/users/search/${this.state.search}`)
      .then(res => {
        this.setState({ ...this.state, data: res.data})
      })
      .catch((err)=> this.setState({ error: err.response.data }))
  }


  render(){
    if(!this.state.data) return null
    return(
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field" >
              <label className="label">Disover Other Users</label>
              <div className="control search-bar">
                <input className="input" type="text" placeholder="search" name="search" onChange={this.handleChange}  value={this.state.search || ''}/>
                <button className="button is-primary home-button" >Submit</button>

              </div>
            </div>
          </form>

          <div className="columns is-multiline">
            {this.state.data.map(user =>
              <Link key={user._id} to={`/users/${user._id}` } className="column is-one-third">
                <div key={user._id}>
                  <UsersResult data={user}/>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default UsersIndex
