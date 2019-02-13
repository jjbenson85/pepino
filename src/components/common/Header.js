import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

// import Auth from '../../lib/Auth'


class Header extends React.Component{

  constructor(){
    super()
    this.handleDropDown = this.handleDropDown.bind(this)
    this.handleNavbarBurger = this.handleNavbarBurger.bind(this)
  }


  handleNavbarBurger(){
    this.navbarBurger.classList.toggle('is-active')
    this.navbar.classList.toggle('is-active')
  }

  handleDropDown(){
    this.navbarDropdown.classList.toggle('is-active')
    this.navbarLinks.classList.toggle('is-hidden-touch')
  }

  BuildDropDownLinks(){
    return this.props.user.project
      .sort( (A,B)=>{
        // const Adate = new Date(A.updatedAt).getTime()
        // const Bdate = new Date(B.updatedAt).getTime()
        const Adate = Date.parse(A.updatedAt)
        const Bdate = Date.parse(B.updatedAt)
        return Bdate-Adate
      })
      .map( (project,i) =>
        (i<5) &&
        <Link key={i} to={`/projects/${project._id}`} className="navbar-item">
          {project.name}
        </Link>
      )
  }


  render(){
    const {user} = this.props
    return(
      <header className='header'>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-item" href="/books">
              <div className="pepino-logo"></div>
            </div>
            <a role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              onClick={this.handleNavbarBurger}
              ref={el => this.navbarBurger = el}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div ref={el => this.navbar = el} className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              {(user)&&
                <Link to={`/users/${user._id}`} className="navbar-item">
                Profile
                </Link>}
              <Link to="/projects" className="navbar-item">
                  Discover more projects
              </Link>
              {(user)&&
              <nav className="navbar link-list" role="navigation" aria-label="dropdown navigation">
                <div
                  ref={el => this.navbarDropdown = el}
                  className="navbar-item has-dropdown"
                  onClick={this.handleDropDown}
                >
                  <a className="navbar-link">
                    Your Projects
                  </a>
                  <div
                    className="navbar-dropdown is-hidden-touch"
                    ref={el => this.navbarLinks = el}
                  >
                    {this.BuildDropDownLinks()}
                  </div>
                </div>
              </nav>}
            </div>
            <div className="navbar-end">
              {(user)&&
              <a to={`/users/${user._id}`} className="navbar-item" onClick={this.props.handleLogout}>
                Log Out
              </a>}
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
