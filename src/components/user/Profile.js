import React, {Component} from 'react';
import axios from 'axios';

//Components
import Header from './Header';
import Folder from './folder/Folder';
import CreateFolder from './folder/CreateFolder';
import FavoriteArtists from './favoriteArtist/FavoriteArtists';


class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders: [],
      favoriteArtists: []
    }
  }

  getInfo(){
    axios.get('http://localhost:8000/api/user', {withCredentials: true})
    .then((response) => {
      let data = response.data;
      this.setState({
        folders: data.folder,
        favoriteArtists: data.favoriteArtist
      })
    })
    .catch(err => console.log(err));
  }

  componentDidMount(){
    this.getInfo();
   }
 
  render(){
    return(
      <div>
        <Header user={this.props.user}/>
        <Folder foldersInfo={() => this.getInfo()} folders={this.state.folders}/>
        <CreateFolder foldersInfo={() => this.getInfo()}/>
        <FavoriteArtists artistInfo={() => this.getInfo()} artists={this.state.favoriteArtists}/>
      </div>
    )
  }

}

export default Profile;