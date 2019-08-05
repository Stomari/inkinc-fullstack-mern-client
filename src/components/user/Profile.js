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
        <div className="container-fluid profile-custom p-5">
          <div className="row p-3">
            <div className="col-lg-4 text-center">
              <Header user={this.props.user}/>
              <FavoriteArtists id="artists" artistInfo={() => this.getInfo()} artists={this.state.favoriteArtists}/>
            </div>
            <div className="col-lg-8">
              <div className="folder-header mt-4">
                <p className="p-2 text-uppercase">
                  Folders
                  <CreateFolder foldersInfo={() => this.getInfo()}/>
                </p>
              </div>
              <Folder id="folder" foldersInfo={() => this.getInfo()} folders={this.state.folders}/>
            </div>

          </div>
        {/* <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a data-toggle="tab" class="nav-link active">Folders</a>
                </li>
                <li class="nav-item">
                    <a data-target="#artists" data-toggle="tab" class="nav-link">Artists</a>
                </li>
                
            </ul> */}
        </div>
      </Fragment>
    )
  }

}

export default Profile;