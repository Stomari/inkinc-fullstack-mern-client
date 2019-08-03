import React, { Component } from 'react';
import './App.css';
import AuthService from './components/auth/auth-service';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/protected-routes'

//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SearchPage from './components/search/SearchPage';
import Profile from './components/user/Profile';
import FolderDetail from './components/user/folder/FolderDetail';


//Victor
// import ByPlaceSearch from './components/places/ByPlaceSearch';
// import ByAddressSearch from './components/places/ByAddressSearch';


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

  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
        return (
          <div className="App">
            <Navbar userInSession={this.state.loggedInUser} getUser={(e) => this.getTheUser(e)} />
            <Switch>
              <ProtectedRoute path='/home' user={this.state.loggedInUser} component={Home} /> 
              {/* Profile Pages */}
              <ProtectedRoute exact path='/profile' user={this.state.loggedInUser}  getUser={() => this.getTheUser()} component={Profile} /> 
              <ProtectedRoute exact path='/profile/folder/:id' user={this.state.loggedInUser}  getUser={() => this.getTheUser()} component={FolderDetail} /> 
            
            </Switch>
          </div>
        );
      } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={(e) => this.getTheUser(e)}/>

          <Switch>
          <Route exact path='/signup' render={() => <Signup getUser={(e) => this.getTheUser(e)}/>} />
          <Route exact path='/login' render={() => <Login getUser={(e) => this.getTheUser(e)}/>} />
          </Switch>
      </div>
      )
     }
  }
 }


export default App;
