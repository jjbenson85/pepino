import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/common/header'
import PackageShow from './components/packages/PackageShow'
import ProjectShow from './components/projects/ProjectShow'
import PackageIndex from './components/packages/PackageIndex'


import Home from './components/Home'
import UsersShow from './components/users/UsersShow'

import 'bulma'
import './scss/style.scss'

class App extends React.Component {

  render(){
    return(
      <BrowserRouter>
        <main>
          <Header />
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
