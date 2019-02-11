import React from 'react'
// import axios from 'axios'
// import Auth from '../lib/Auth'


class UsersEdit extends React.Component{

  constructor(){
    super()
    this.state = {
      data: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeState = this.changeState.bind(this)

  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    this.setState({data})
  }

  // registerFunction(){
  //   axios
  //     .post('api/register', this.state.data)
  //     .then(this.setState({...this.state,  data: {}}))
  //     .catch(err => console.log(err.message))
  // }
  //
  // loginFunction(){
  //   axios
  //     .post('api/login', this.state.data)
  //     .then(res => Auth.setToken(res.data.token))
  //     .then(() => this.props.history.push(`/users/${Auth.getUserID()}`))
  //     .catch(err => console.log(err.message))
  // }

  changeState(){
    this.setState({...this.state, register: !this.state.register })
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
              <h1>Edit</h1>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UsersEdit
