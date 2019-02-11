import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/common/header'
import PackageShow from './components/packages/PackageShow'
import ProjectShow from './components/projects/ProjectShow'
import PackageIndex from './components/packages/PackageIndex'


import Home from './components/Home'
//import Login from './components/auth/LoginF'
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
  }

  componentDidMount(){


    axios.get(`/api/users/${Auth.getUserID()}`)
      .then( res =>{
        this.setState({ user: res.data})
      })
      .catch((err)=>console.log(err.message))
  }

  render(){
    return(
      <BrowserRouter>
        <main>
          <Header user={this.state.user}/>
          <Switch>
            <Route path="/projects/:id" component={ProjectShow} />
            <Route path="/packages/:name" component={PackageShow} />
            <Route path="/packages" component={PackageIndex} />
            <Route path="/users/:id" component={UsersShow} />
            <Route path="/" component={Home} />
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
