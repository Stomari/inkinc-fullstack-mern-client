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
          this.setState({ chat: response.data[0], messages: [...response.data[0].historic] })
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

  getClientChat(id) {
    axios.get(`${process.env.REACT_APP_API_URL}/api/has-chat-artist/${id}`, { withCredentials: true })
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

  handleChat() {
    this.setState({ chatFlag: !this.state.chatFlag })
  }

  showUsersChat() {
    this.setState({ artistChatFlag: !this.state.artistChatFlag });
    this.closeChat();
  }

  render() {
    if (this.state.user !== undefined && this.state.user.role === 'User') {
      return (
        <div>
          {
            this.state.chat ?
              <button className="start-chat" onClick={() => this.handleChat()}>
                {
                  !this.state.chatFlag ?
                    <img src="/images/chat.svg" alt="chat icon" />
                    :
                    <span style={{ color: "white", fontSize: "200%" }} aria-hidden="true">&times;</span>
                }
              </button>
              :
              <button className="start-chat" onClick={(event) => this.createRoom(event)}>
                {
                  !this.state.chatFlag ?
                    <img src="/images/chat.svg" alt="chat icon" />
                    :
                    <span style={{ color: "white", fontSize: "200%" }} aria-hidden="true">&times;</span>
                }
              </button>
          }
          {
            this.state.chatFlag ?
              <div className="chat">
                <button type="button" className="close close-chat" onClick={() => this.closeChat()}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="chat-title">Ink Chat</h3>
                <hr />
                <ScrollToBottom className="messages-container">
                  {this.state.messages.map((message, i) => {
                    return (
                      <div className="messages" style={{ color: "black" }} key={i}><p><strong>{message.author}:</strong> {message.message}</p></div>
                    )
                  })}
                </ScrollToBottom>
                <form autoComplete="off" >
                  <div className="inputs-chat">
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
    } else if (this.state.user !== undefined && this.state.user.role === 'Artist' && this.props.artistId === this.state.user._id) {
      return (
        <div className="container">
          {
            this.state.artistChatFlag ?
              <div className="chat">
                <h3 className="chat-user-title">Clients</h3>
                <ScrollToBottom className="users-container-chat">
                  {
                    this.state.user.chatHistoric.length > 0 ?
                      this.state.user.chatHistoric.map((e, i) => {
                        return <div key={i} className="user-chat" onClick={(id) => this.getClientChat(e.user._id)}>
                          <img className="img-chat" src={e.user.profileImg} alt={e.user.name} />
                          <p className="user-select-chat">{e.user.name}</p>
                        </div>
                      })
                      :
                      <div className="user-chat">
                        <p className="user-select-chat"><strong>You have no messages yet</strong></p>
                      </div>
                  }
                </ScrollToBottom>
              </div>
              :
              null
          }
          <button className="start-chat" onClick={() => this.showUsersChat()}>
            {
              !this.state.chatFlag ?
                <img src="/images/chat.svg" alt="chat icon" />
                :
                <span style={{ color: "white", fontSize: "200%" }} aria-hidden="true">&times;</span>
            }
          </button>
          {
            this.state.chatFlag ?
              <div className="chat">
                <button type="button" className="close close-chat" onClick={() => this.closeChat()}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="chat-title">Ink Chat</h3>
                <hr />
                <ScrollToBottom className="messages-container">
                  {this.state.messages.map((message, i) => {
                    return (
                      <div className="messages" style={{ color: "black" }} key={i}><strong>{message.author}:</strong> {message.message}</div>
                    )
                  })}
                </ScrollToBottom>
                <form autoComplete="off" >
                  <div className="inputs-chat">
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