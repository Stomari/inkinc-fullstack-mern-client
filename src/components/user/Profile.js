import React, {Component, Fragment} from 'react';
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
      <Fragment>
      <div className="container profile-custom mt-5">
          <Header user={this.props.user}/>
          <CreateFolder foldersInfo={() => this.getInfo()}/>
        </div>
        <div className="container profile-custom mt-4">
        <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a data-toggle="tab" class="nav-link active">Folders</a>
                </li>
                <li class="nav-item">
                    <a data-target="#artists" data-toggle="tab" class="nav-link">Artists</a>
                </li>
                
            </ul>
          <Folder id="folder" foldersInfo={() => this.getInfo()} folders={this.state.folders}/>
          <FavoriteArtists id="artists" artistInfo={() => this.getInfo()} artists={this.state.favoriteArtists}/>
        </div>
      </Fragment>
    )
  }

}

export default Profile;