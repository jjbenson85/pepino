import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor(){
    super()
    this.state = {
      data: {
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    this.setState({data})
  }
  handleSubmit(e){
    e.preventDefault(e)
    axios
      .post('api/login', this.state.data)
      .then(res => Auth.setToken(res.data.token))
      //.then(() => this.props.history.push('/login'))
      .catch(err => console.log(err.message))
  }

  render(){
    const{email, password} = this.state.data
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">

              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Email" name="email" onChange={this.handleChange} value={email}/>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input className="input" type="password" placeholder="Password" name="password" onChange={this.handleChange} value={password}/>
                  </div>
                </div>
                <div className="field">
                  <button className="button is-primary home-button">Submit</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
