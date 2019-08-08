import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/App.css';
import './stylesheets/mainPage.css';
import './stylesheets/navbar.css';
import './stylesheets/auth.css';
import './stylesheets/profile.css';
import './stylesheets/chat.css';
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
import ArtistPage from './components/artist/ArtistPage';



//Victor
// import ByPlaceSearch from './components/places/ByPlaceSearch';
// import ByAddressSearch from './components/places/ByAddressSearch';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    })
  }
  
  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
          <div className="App">
            <Navbar userInSession={this.state.loggedInUser} getUser={(obj) => this.getTheUser(obj)} />
            <Switch>
              <Route exact path='/' render={() => <Home/>} />
              <Route exact path="/home" render={() => <Home user={this.state.loggedInUser}/>}/> 
              <Route path="/artists/:id" render={(props) => <ArtistPage user={this.state.loggedInUser} {...props} getUser={(obj) => this.getTheUser(obj)}/>} />
              <Route exact path='/search/artists' key="search-artists" render={() => <SearchPage user={this.state.loggedInUser} searchFlag={true} />} />
              <Route exact path='/search/tattoos' key="search-tattoos" render={() => <SearchPage user={this.state.loggedInUser} searchFlag={false} />} />

              {/* Profile Pages */}
              <ProtectedRoute exact path='/profile' user={this.state.loggedInUser} component={Profile} getUser={(obj) => this.getTheUser(obj)} /> 
              <ProtectedRoute exact path='/profile/folder/:id' user={this.state.loggedInUser} component={FolderDetail} getUser={(obj) => this.getTheUser(obj)} /> 
            
            </Switch>
          </div>
        );
      } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={(obj) => this.getTheUser(obj)}/>

          <Switch>
            <Route exact path='/signup' render={() => <Signup getUser={(obj) => this.getTheUser(obj)}/>} />
            <Route exact path='/login' render={() => <Login getUser={(obj) => this.getTheUser(obj)}/>} />
            <Route exact path='/' render={() => <Home/>} />
            <Route exact path='/search' render={() => <SearchPage/>} />
            <Route path='/artists/:id' render={(props) => <ArtistPage getUser={(obj) => this.getTheUser(obj)} {...props} />} />
            {/* <ProtectedRoute path='/home' user={this.state.loggedInUser} component={Home} /> */}
          </Switch>
        </div>
      )
    }
  }
}


export default App;
