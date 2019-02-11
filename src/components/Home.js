import React from 'react'
import RegisterForm from './auth/RegisterForm'

class Home extends React.Component{

  constructor(){
    super()
  }

  render(){
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
