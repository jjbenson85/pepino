import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/common/header'
import PackageShow from './components/packages/packageShow'
// import BooksIndex from './components/books/BooksIndex'
// import Home from './components/Home'
// import SecureRoute from './components/common/SecureRoute'
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
