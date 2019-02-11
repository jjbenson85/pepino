import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

// import Auth from '../../lib/Auth'


class Header extends React.Component{



  componentDidMount(){

    // axios.get(`/api/users/${Auth.getUserID()}`)
    //   .then( res =>{
    //     this.setState({ user: res.data})
    //   })
    //   .catch((err)=>console.log(err.message))


    const el = document.querySelector('.navbar-burger')
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target
      const $target = document.getElementById(target)

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active')
      $target.classList.toggle('is-active')

    })
  }

  componentDidUpdate(){
    if(this.props.user){
      console.log(this.props.user)
      const dropdown = document.querySelector('.has-dropdown')
      dropdown.addEventListener('click', function(event) {
        event.stopPropagation()
        dropdown.classList.toggle('is-active')
      })
    }

  }

  render(){

    return(
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-item" href="/books">
              <div className="pepino-logo"></div>
            </div>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              {(this.props.user)&&<nav className="navbar" role="navigation" aria-label="dropdown navigation">
                <div className="navbar-item has-dropdown">
                  <a className="navbar-link">
                    Projects
                  </a>
                  <div className="navbar-dropdown">
                    {this.props.user.project.map( (project,i) =>
                      <Link key={i} to={`/projects/${project._id}`} className="navbar-item">
                        {project.name}
                      </Link>
                    )}
                  </div>
                </div>
              </nav>}
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
