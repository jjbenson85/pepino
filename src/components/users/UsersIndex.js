import React from 'react'
import UsersResult from './UsersResult'
import axios from 'axios'
import { Link } from 'react-router-dom'

import debounce from 'lodash/debounce'


class UsersIndex extends React.Component{
  constructor(){
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.delayedCallback = debounce(this.searchUser, 1000)
  }

  getAllUsers(){
    axios.get('/api/users')
      .then(res =>{
        this.setState({ data: res.data})
      })
      .catch((err)=>console.log(err.response.data))
  }

  componentDidMount(){
    this.getAllUsers()
  }

  handleChange({target: {name, value}}){
    this.setState({...this.state, [name]: value})
    this.delayedCallback()
  }

  searchUser(){
    console.log(this.state.search.replace(/\s/g, ''))
    if(this.state.search.trim() !== ''){
      axios.get(`/api/users/search/${this.state.search.trim()}`)
        .then(res => {
          this.setState({ ...this.state, data: res.data})
        })
        .catch((err)=>console.log(err.response.data))
    }else{
      this.getAllUsers()
    }
  }

  handleSubmit(e){
    e.preventDefault(e)
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
