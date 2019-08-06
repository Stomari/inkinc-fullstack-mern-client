import React from "react";
import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_API_URL);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: null,
      username: '',
      message: '',
      messages: [],
      chat: null,
    };
    this.getChatFlag = true;
    console.log(this.props.artistId)
  }

  componentDidMount() {
    socket.on('RECEIVE_MESSAGE', (data) => {
      this.addMessage(data);
    });
    socket.on('RETRIEVE_CHAT', (chat) => {
      this.setChat(chat);
    })
    this.setState({ userLogged: this.props.user });
  }

  // START OF CHAT HANDLERS
  // getChat() {
  //   socket.emit('GET_CHAT', {
  //     user: this.state.userLogged,
  //     artist: this.props.artistId,
  //   })
  //   this.getChatFlag = false
  // }

  setChat(data) {
    console.log(data)
    this.setState({
      messages: [...data[0].historic], 
      chat: data
    });
  }
  // END OF CHAT HANDLERS

  componentWillReceiveProps(nextProps) {
    this.setState({
      userLogged: nextProps.user,
    })
  }

  inputHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // START OF MESSAGE HANDLERS
  addMessage = (data) => {
    this.setState({ messages: [...this.state.messages ,data] });
  };

  sendMessage = (ev) => {
    ev.preventDefault();
    socket.emit('SEND_MESSAGE', {
      author: this.props.user.name,
      message: this.state.message,
      chatId: this.state.chat[0]._id,
    });
    this.setState({ message: '' });
  }
  // END OF MESSAGE HANDLERS

  render() {
    // if (this.state.userLogged && this.getChatFlag === true) {
    //   this.getChat();
    // } 

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
                  <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
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

export default Chat;