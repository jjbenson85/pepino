import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class CommentInput extends React.Component{

  constructor(){
    super()
    this.state={
      message: ''
    }

    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }


  sendMessage(){
    const text = this.state.message
    const user = Auth.getUserID()
    // axios.post(`/api/packages/${this.props.name}`,
    axios.post(this.props.postCommentUrl,
      {
        text,
        user
      })
      .then( () => {
        this.props.updateThread({text, user})
        this.messageArea.value=''
        this.setState({
          message: ''
        })
      })
  }

  handleMessageChange(e){
    //Update the message
    this.setState({ message: e.target.value })
  }

  render(){
    return(
      <div className="comment-input">
        <div className="field has-addons">
          <div className="control textarea-control">
            <textarea
              className="textarea"
              ref={el => this.messageArea = el}
              name="message"
              onChange={this.handleMessageChange}
              defaultValue={this.state.message}
            ></textarea>

          </div>
          <div className="control">
            <button
              className="button is-primary"
              onClick={this.sendMessage}
            >Send</button>
          </div>
        </div>
      </div>
    )
  }
}
export default CommentInput
