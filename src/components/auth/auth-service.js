import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:8000/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup(username, password){
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }

  loggedin(){
    return this.service.get('/loggedin')
    .then(response => response.data)
  }
  logout(){
    return this.service.post('/logout', {})
    .then(response => response.data)
  }
}

// logoutUser = () =>{
//   this.service.logout()
//   .then(() => {
//     this.setState({ loggedInUser: null });
//     this.props.getUser(null);  
//   })
// }

// <Link to='/'>
// <button onClick={() => this.logoutUser()}>Logout</button>
// </Link>

export default AuthService;