import React from 'react'
import RegisterForm from './auth/RegisterForm'

//import axios from 'axios'


class Home extends React.Component{

  constructor(){
    super()
    this.state = {}

  }

  // componentDidMount(){
  //   this.getPackageData()
  // }

  render(){
  //  if(!this.state.package) return null

    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h2>Built for Developers</h2>
            </div>
            <div className="column is-half">
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
