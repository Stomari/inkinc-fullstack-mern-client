import React from "react";
import io from "socket.io-client";
import axios from "axios";
import ScrollToBottom from 'react-scroll-to-bottom';
const socket = io.connect(process.env.REACT_APP_API_URL);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: '',
      user: '',
      message: '',
      messages: [],
      chatFlag: false,
      artistChatFlag: false,
    };
  }

  componentDidMount() {
    this.setState({ user: this.props.user });
    axios.get(`${process.env.REACT_APP_API_URL}/api/has-chat/${this.props.artistId}`, { withCredentials: true })
      .then(response => {
        if (response.data[0] !== undefined) {
          this.setState({ chat: response.data[0], messages: [...response.data[0].historic], chatFlag: true })
          this.joinRoom(response.data[0]._id)
          this.updateChat();
        }
      })
      .catch(err => console.log(err))
    socket.on('RECEIVE_MESSAGE', (message) => {
      this.setState({
        messages: [...this.state.messages, message],
      });
    })
    this.updateChat();
  }

  inputHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  sendMessage = (event) => {
    event.preventDefault();
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
    this.setState({ chatFlag: !this.state.chatFlag })
  }

  joinRoom(room) {
    socket.emit('SUBSCRIBE', room);
  }

  getClientChat(event) {
    event.preventDefault();
    axios.get(`${process.env.REACT_APP_API_URL}/api/has-chat-artist/${event.target[0].value}`, { withCredentials: true })
      .then(response => {
        if (response.data[0] !== undefined) {
          this.setState({ chat: response.data[0], messages: [...response.data[0].historic], chatFlag: true })
          this.joinRoom(response.data[0]._id)
        }
      })
      .catch(err => console.log(err))
  }

  updateChat() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.props.getUser(response.data);
      })
      .catch(err => console.log(err));
  }

  closeChat() {
    this.setState({ chatFlag: false });
  }

  showUsersChat() {
    this.setState({ artistChatFlag: !this.state.artistChatFlag });
  }

  render() {
    if (this.state.user !== undefined && this.state.user.role === 'User') {
      return (
        <div>
          <button className="start-chat" onClick={(event) => this.createRoom(event)}>Chat</button>
          {
            this.state.chatFlag ?
              <div className="chat">
                <button type="button" className="close" onClick={() => this.closeChat()}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="title">Ink Chat</h3>
                <hr />
                <ScrollToBottom className="messages-container">
                  {this.state.messages.map((message, i) => {
                    return (
                      <div className="messages" style={{ color: "black" }} key={i}><strong>{message.author}:</strong> {message.message}</div>
                    )
                  })}
                </ScrollToBottom>
                <form autoComplete="off" >
                  <div className="inputs">
                    <input type="text" placeholder="Message" name="message" className="" value={this.state.message} onChange={(event) => this.inputHandler(event)} />
                    <button type="submit" onClick={this.sendMessage} className="btn btn-primary">Send</button>
                  </div>
                </form>
              </div>
              :
              null
          }
        </div>
      );
    } else if (this.state.user !== undefined && this.state.user.role === 'Artist') {
      return (
        <div className="container">
          {/* <form onSubmit={(event) => this.getClientChat(event)}>
            <select>
              {
                this.state.user.chatHistoric.map((e, i) => {
                  return <option key={i} value={e.user._id}>{e.user.name}</option>
                })
              }
            </select>
            <button className="start-chat">Chat</button>
          </form> */}
          {
            this.state.artistChatFlag ?
              <div className="chat">
                {
                  this.state.user.chatHistoric.map((e, i) => {
                    return <div key={i} value={e.user._id} className="user-select">{e.user.name}</div>
                  })
                }
              </div>
              :
              null
          }
          <button className="start-chat" onClick={() => this.showUsersChat()}>Chat</button>
          {
            this.state.chatFlag ?
              <div className="chat">
                <button type="button" className="close" onClick={() => this.closeChat()}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="title">Ink Chat</h3>
                <hr />
                <ScrollToBottom className="messages-container">
                  {this.state.messages.map((message, i) => {
                    return (
                      <div className="messages" style={{ color: "black" }} key={i}><strong>{message.author}:</strong> {message.message}</div>
                    )
                  })}
                </ScrollToBottom>
                <form autoComplete="off" >
                  <div className="inputs">
                    <input type="text" placeholder="Message" name="message" className="" value={this.state.message} onChange={(event) => this.inputHandler(event)} />
                    <button type="submit" onClick={this.sendMessage} className="btn btn-primary">Send</button>
                  </div>
                </form>
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

export default Chat;