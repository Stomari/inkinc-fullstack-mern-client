import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {Masonry} from 'gestalt';
import FolderMasonry from './FolderMasonry';

//Components
import Header from '../Header';
import FavoriteArtists from '../favoriteArtist/FavoriteArtists';

class FolderDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      folder: [],
      favoriteArtists: [],

    }
    
  }
  
  componentWillMount(){
    this.updateFolderInfo();
    this.getInfo();

  }


  getInfo(){
    axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {withCredentials: true})
    .then((response) => {
      let data = response.data;
      this.setState({
        favoriteArtists: data.favoriteArtist,
        image: data.profileImg,
      })
      this.props.getUser(data)
    })
    .catch(err => console.log(err));
  }


  updateFolderInfo() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {withCredentials: true})
    .then((response) => {
      let folderData = response.data.folder;
      let filter = folderData.filter((elem) => {
        return elem._id.includes(this.props.match.params.id)
      })[0];
      this.setState({
        folder: filter
      })
    })
    .catch(err => console.log(err));
  }
  

  renderData(data) {
    return <FolderMasonry {...data} detailsProps={this.props} updateFolderInfo={() => this.updateFolderInfo()}/>
  }

  render(){
    return (  
      <Fragment>
        <div className="container-fluid profile-custom">
          <div className="row m-5">

            <div className="col-lg-3 d-flex justify-content-center text-center profile-side-header align-items-start">
              <div className="d-flex row justify-content-center align-items-start">
                <Header user={this.props.user} image={this.state.image} handleFileUpload={(e) => this.handleFileUpload(e)} />
                <FavoriteArtists id="artists" artistInfo={() => this.getInfo()} artists={this.state.favoriteArtists}/>
              </div>
            </div>

      <div className="col-lg-9">
        <h2 className="text-center text-uppercase">{this.state.folder.name}</h2>
        {
          this.state.folder && this.state.folder.image && this.state.folder.image.length > 0 &&
          <Masonry
            comp={(data) => this.renderData(data)}
            items={this.state.folder.image}
            // loadItems={this.loadItems}
            minCols={1}
          />
        }
      </div>
          </div>
          </div>

      </Fragment>
    )
      //  if(this.state.folder.image === undefined){
      //   return(
      //    <p>TESTE</p>
      //   )
      //  } else {
      //    return (
      //     <div>
      //      <p> {this.state.folder.name}</p>
      //     { 
      //       this.state.folder.image.map((img, index) => {
      //       return <FolderImage key={index} image={img}/>
      //       })
      //     }
      //    </div>
      //  )
      //  }
   
  }
}

export default FolderDetail;