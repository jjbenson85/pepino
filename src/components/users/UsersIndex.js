import React from 'react'
import UsersResult from './UsersResult'
import axios from 'axios'


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
          <div className="columns is-multiline">
            {this.state.data.map(user =>
              <div key={user._id} className="column is-one-third">
                <UsersResult data={user}/>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default UsersIndex
