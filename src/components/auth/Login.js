import React from 'react'
import axios from 'axios'

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
    // axios
    //   .post('api/register', this.state.data)
    //   .then(() => this.props.history.push('/login'))
    //   .catch(err => console.log(err.message))
  }

  render(){
    //const{username, email, password, passwordConfirmation} = this.state.data
    return(
      <h1>Log in</h1>
    )
  }
}

export default Login
