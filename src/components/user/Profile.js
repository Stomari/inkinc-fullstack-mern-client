import React, { Component, Fragment } from 'react';
import axios from 'axios';

//Components
import Header from './Header';
import Folder from './folder/Folder';
import CreateFolder from './folder/CreateFolder';
import FavoriteArtists from './favoriteArtist/FavoriteArtists';

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      folders: [],
      favoriteArtists: [],
      image: ''
    }
  }

  getInfo(){
    axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {withCredentials: true})
    .then((response) => {
      let data = response.data;
      this.setState({
        folders: data.folder,
        favoriteArtists: data.favoriteArtist,
        image: data.profileImg,
      })
      this.props.getUser(data)
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getInfo();
  }

  handleFileUpload(e) {
    this.setState({
      image: 'https://media.tenor.com/images/80cb16bb74ed9027ea1b25d077ce6d97/tenor.gif'
    });
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", e.target.files[0]);
    axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {withCredentials: true})
      .then(response => {
          this.setState({ image: response.data.secure_url });
          console.log('RESPONSE DATA', response.data);
          axios.put(`${process.env.REACT_APP_API_URL}/api/profile-pic`, {image: response.data.secure_url}, {withCredentials: true})
            .then(() => {
              this.getInfo();
              console.log('testeeeeeeee')
            })
            .catch(err => console.log(err));
        })
      .catch(err => console.log(err));
  }

  render(){
    return(
      <Fragment>
        <div className="container-fluid profile-custom">
          <div className="row m-5">

            <div className="col-lg-3 text-center profile-side-header mb-5">
              <Header user={this.props.user} image={this.state.image} handleFileUpload={(e) => this.handleFileUpload(e)} />
              <FavoriteArtists id="artists" artistInfo={() => this.getInfo()} artists={this.state.favoriteArtists}/>
            </div>

            <div className="col-lg-9 p-0 profile-side-main pr-5">
              <div className="d-flex justify-content-center">
                <div className="row text-uppercase folder-header d-flex justify-content-center mb-5 text-center">
                 <h4 className="pr-5">Tattoos you liked</h4>
                  <CreateFolder foldersInfo={() => this.getInfo()}/>
                </div>
              </div>
              <Folder id="folder" foldersInfo={() => this.getInfo()} folders={this.state.folders} />
            </div>

          </div>
        </div>
      </Fragment>
    )
  }

}

export default Profile;