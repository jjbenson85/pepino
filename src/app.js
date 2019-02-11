import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'

import Header from './components/common/header'
import PackageShow from './components/packages/PackageShow'
import ProjectShow from './components/projects/ProjectShow'
import PackageIndex from './components/packages/PackageIndex'


import Home from './components/Home'
import UsersShow from './components/users/UsersShow'
import Auth from './lib/Auth'

import 'bulma'
import './scss/style.scss'
import axios from 'axios'

class App extends React.Component {

  constructor(){
    super()
    this.state={
      user: null
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleLogin = this.handleLogin.bind(this)

  }

  componentDidMount(){
    this.setState({redirection: null})
    if(Auth.getUserID()){
      console.log('user',Auth.getUserID())
      axios.get(`/api/users/${Auth.getUserID()}`)
        .then( res =>{
          this.setState({ user: res.data})
        })
        .catch((err)=>console.log(err.message))
    }
  }

  componentDidUpdate(){
    if(this.state.redirection) this.setState({redirection: null})
  }

  handleLogout(){
    Auth.removeToken()
    console.log('log out')
    this.setState({
      user: null,
      redirection: '/',
      loggedIn: false
    })
  }

  handleLogin(e,data){
    e.preventDefault(e)
    // console.log(data)
    axios
      .post('api/login', data)
      .then(res => {
        Auth.setToken(res.data.token)
      })
      .then(() => {
        return axios.get(`/api/users/${Auth.getUserID()}`)
      })
      // .then(() => this.props.history.push(`/users/${Auth.getUserID()}`))
      .then((res) =>{
        console.log('data', res.data)
        this.setState({
          user: res.data,
          redirection: `/user/${Auth.getUserID()}`
        })
      })
      .catch(err => console.log(err.message))
  }

  render(){
    const _Home = props => <Home handleLogin={this.handleLogin} {...props}/>

    return(
      <BrowserRouter>
        <main>
          {(this.state.redirection) && <Redirect push to={this.state.redirection} />}
          <Header
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route path="/projects/:id" component={ProjectShow} />
            <Route path="/packages/:name" component={PackageShow} />
            <Route path="/packages" component={PackageIndex} />
            <Route path="/users/:id" component={UsersShow} />
            <Route path="/" handleLogin={this.handleLogin} component={_Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
