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
    return(
      <div className="card card-prof-custom" style={{"width": "20rem"}}>

        <picture>
          {/* grid image */}
          <img src="/images/teste-folder.jpeg" className="card-img-top"  style={{"height": "15rem"}} alt="..."/>
        </picture>

        <div className="card-body">
          <p className="card-text">
          <Link className="link-custom text-uppercase" to={`/profile/folder/${this.props.state._id}`}>
            {this.props.state.name}
          </Link>
          </p>
          <div className="overlay2">
            <p className="text2 text-uppercase">
              <p onClick={(folder) => this.deleteFolder(this.props.state._id)}> 
              <img src="/images/trash-solid.svg" className="trash-ico"/>

              </p>
            </p>
          </div>
        </div>
        
      </div>
    )
  }
}

export default FolderCard;