const React = require('react')

const axios = require('axios')

class SearchBar extends React.Component{
  constructor(){
    super()

    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({text: e.currentTarget.value})
  }

  handleSubmit(e){
    e.preventDefault()
    axios
      .get(this.props.url+'/'+this.state.text)
      .then((data) => {
        // console.log(data)
        this.props.returnData(data)
      })
      .catch((err) => console.log('error',err.errors))
  }



  render(){
    return(
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <div className="field has-addons">
          <div className="control field">
            <input
              className="input"
              name="search"
              type="text"
              placeholder="Search"
              onChange={this.handleChange}
              value={this.state.text}
            />
          </div>
          <div className="control">
            <button className="button is-info">
              Search
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default SearchBar
