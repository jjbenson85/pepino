import React from 'react'
import UsersResult from './UsersResult'
import axios from 'axios'
import { Link } from 'react-router-dom'


class UsersIndex extends React.Component{
  constructor(){
    super()
    this.state = {}
  }

  componentDidMount(){
    axios.get('/api/users')
      .then( res =>{
        this.setState({ data: res.data})
      })
      .catch((err)=>console.log(err.message))
  }

  render(){
    console.log(this.state.data)
    if(!this.state.data) return null
    return(
      <section className="section">
        <div className="container">
          <form >
            <div className="field" >
              <label className="label">Disover Other Users</label>
              <div className="control search-bar">
                <input className="input" type="text" placeholder="search" name="search" />
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
