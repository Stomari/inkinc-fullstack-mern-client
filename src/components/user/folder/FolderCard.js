import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class FolderCard extends Component {

  deleteFolder(folder){
    axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-folder/${folder}`, { withCredentials: true })
      .then(() => {
        this.props.getInfo()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render(){
    // console.log(this.props.user.folder[this.props.idx].image.length)
    return(
      <div className="card card-prof-custom" style={{width: "20rem"}}>

        {/* grid image */}
        <figure className="folder-cover">
          <Link className="link-custom text-uppercase" to={`/profile/folder/${this.props.state._id}`}>
          {
            this.props.user.folder[this.props.idx] && this.props.user.folder[this.props.idx].image && this.props.user.folder[this.props.idx].image.length > 0 ?
            <img className="card-img-top" src={this.props.user.folder[this.props.idx].image[0].image} alt="folder cover"/>
            : <img className="card-img-top" src="/images/teste-folder.jpeg"  alt="folder cover"/>
          }
          </Link>
        </figure>

        <div className="card-body">
          <p className="card-text">
          <Link className="link-custom text-uppercase" to={`/profile/folder/${this.props.state._id}`}>
            {this.props.state.name}
          </Link>
          </p>
          <div className="overlay2">
            <div className="text2 text-uppercase pb-3">
              <img src="/images/trash-black.svg" className="trash-ico" alt="folder cover" onClick={(folder) => this.deleteFolder(this.props.state._id)}/>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default FolderCard;