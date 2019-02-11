import React from 'react'
import RegisterForm from './auth/RegisterForm'
import LoginForm from './auth/LoginForm'
import axios from 'axios'
import Auth from '../lib/Auth'


class Home extends React.Component{

  constructor(){
    super()
    this.state = {
      data: {},
      register: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    this.setState({data})
  }

  registerFunction(){
    axios
      .post('api/register', this.state.data)
      .then(this.setState({...this.state.data, register: false}))
      .catch(err => console.log(err.message))
  }

  loginFunction(){
    axios
      .post('api/login', this.state.data)
      .then(res => Auth.setToken(res.data.token))
      .then(() => this.props.history.push(`/users/${Auth.getUserID()}`))
      .catch(err => console.log(err.message))
  }

  handleSubmit(e){
    e.preventDefault(e)
    const command = e.target.name
    if(command === 'register' ) this.registerFunction()
    else this.loginFunction()

  }

  render(){
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h2>Built for Developers</h2>
            </div>
            <div className="column is-half">
              {this.state.register &&  <RegisterForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                data={this.state.data}
              />}

              {!this.state.register && <LoginForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                data={this.state.data}
              />}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
