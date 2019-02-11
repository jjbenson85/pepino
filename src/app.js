import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/common/header'
import PackageShow from './components/packages/packageShow'
import Home from './components/Home'
//import Login from './components/auth/LoginF'
import UsersShow from './components/users/UsersShow'
import ProjectsIndex from './components/projects/projectsIndex'
import ProjectNew from './components/projects/projectNew'

import 'bulma'
import './scss/style.scss'

class App extends React.Component {

  render(){
    return(
      <BrowserRouter>
        <main>
          <Header />
          <Switch>
            <Route path="/projects/new" component={ProjectNew} />
            <Route path="/projects" component={ProjectsIndex} />
            <Route path="/packages/:name" component={PackageShow} />
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
