import React from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");

class Chat1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: '',
      user: '',
      message: '',
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ user: this.props.user })
    socket.on('RECEIVE_MESSAGE', (message) => {
      console.log(message)
      this.setState({
        messages: [...this.state.messages, message],
      });
    })
  }

  inputHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  sendMessage = () => {
    socket.emit('SEND_MESSAGE', {
      author: this.state.user.name,
      message: this.state.message,
    })
    this.setState({ message: '' })
  }

  addMessage = (message) => {
    console.log(message)
    this.setState({
      messages: [...this.state.messages, message],
    });
  }

  render() {
    console.log(this.state)

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map((message, i) => {
                    return (
                      <div key={i}>{message.author}: {message.message}</div>
                    )
                  })}
                </div>
                <div className="footer">
                  <input type="text" placeholder="Message" name="message" className="form-control" value={this.state.message} onChange={(event) => this.inputHandler(event)} />
                  <br />
                  <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat1;