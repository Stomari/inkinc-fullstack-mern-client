import React, { Component } from 'react';
import './App.css';
import AuthService from './components/auth/auth-service';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser(userObj){
    this.setState({
      loggedInUser: userObj
    })
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }

  render() {
    this.fetchUser()
    console.log(this.state)
    if(this.state.loggedInUser){
      return <Redirect to={'/'}/>
    } else {
      return (
        <div className="App">
        <Switch>
          <Route exact path="/signup" render={() => <Signup getUser={() => this.getTheUser()}/>} />
          <Route exact path='/' render={() => <Login getUser={() => this.getTheUser()}/>} />
        </Switch>
      </div>
      )
    }
  }
 }

export default App;
