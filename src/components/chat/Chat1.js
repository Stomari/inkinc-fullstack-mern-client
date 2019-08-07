import React from "react";
import io from "socket.io-client";
import axios from "axios";
import { all } from "q";
const socket = io.connect(process.env.REACT_APP_API_URL);

class Chat1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: '',
      user: '',
      message: '',
      messages: [],
      chatFlag: false,
    };

  }

  componentDidMount() {
    this.setState({ user: this.props.user });
    axios.get(`${process.env.REACT_APP_API_URL}/api/has-chat/${this.props.artistId}`, { withCredentials: true })
      .then(response => {
        if (response.data[0] !== undefined) {
          this.setState({ chat: response.data[0], messages: [...response.data[0].historic], chatFlag: true })
          this.joinRoom(response.data[0]._id)
        }
      })
      .catch(err => console.log(err))
    socket.on('RECEIVE_MESSAGE', (message) => {
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
    axios.put(`${process.env.REACT_APP_API_URL}/api/add-message/${this.state.chat._id}`, { author: this.state.user.name, message: this.state.message }, { withCredentials: true })
      .then(() => {
        this.setState({ messages: [...this.state.messages, { author: this.state.user.name, message: this.state.message }] })
        socket.emit('SEND_MESSAGE', {
          author: this.state.user.name,
          message: this.state.message,
          room: this.state.chat._id,
        })
        this.setState({ message: '' })
      })
      .catch(err => console.log(err));
  }

  createRoom(event) {
    event.preventDefault();
    axios.get(`${process.env.REACT_APP_API_URL}/api/create-chat/${this.props.artistId}`, { withCredentials: true })
      .then((response) => {
        this.setState({ chat: response.data })
        this.joinRoom(response.data._id)
      })
      .catch(err => console.log(err));
  }

  joinRoom(room) {
    socket.emit('SUBSCRIBE', room);
    this.setState({ chatFlag: true })
  }

  getClientChat(event) {
    event.preventDefault();
    console.log(event.target[0].value)
    axios.get(`${process.env.REACT_APP_API_URL}/api/has-chat-artist/${event.target[0].value}`, { withCredentials: true })
      .then(response => {
        console.log(response.data)
        if (response.data[0] !== undefined) {
          this.setState({ chat: response.data[0], messages: [...response.data[0].historic], chatFlag: true })
          this.joinRoom(response.data[0]._id)
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    if (this.state.user.role === 'User') {
      return (
        <div className="container">
          <button onClick={(event) => this.createRoom(event)}>Chat with Artist</button>
          {
            this.state.chatFlag ?
              <div className="row">
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">Global Chat</div>
                      <hr />
                      <div className="messages">
                        {this.state.messages.map((message, i) => {
                          return (
                            <div style={{ color: "black" }} key={i}>{message.author}: {message.message}</div>
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
              :
              null
          }
        </div>
      );
    } else if (this.state.user.role === 'Artist') {
      return (
        <div className="container">
          <form onSubmit={(event) => this.getClientChat(event)}>
            <select>
              {
                this.state.user.chatHistoric.map((e, i) => {
                  return <option key={i} value={e.user._id}>{e.user.name}</option>
                })
              }
            </select>
            <button>Chat with this Client</button>
          </form>
          {
            this.state.chatFlag ?
              <div className="row">
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">Global Chat</div>
                      <hr />
                      <div className="messages">
                        {this.state.messages.map((message, i) => {
                          return (
                            <div style={{ color: "black" }} key={i}>{message.author}: {message.message}</div>
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
              :
              null
          }
        </div>
      );
    } else {
      return null
    }
  }
}

export default Chat1;