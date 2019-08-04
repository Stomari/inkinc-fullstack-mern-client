import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Components
import FolderCard from './FolderCard';

class Folder extends Component {

  deleteProject(folder){
    console.log( 'DELETE', folder)
    axios.delete(`http://localhost:8000/api/delete-folder/${folder}`, { withCredentials: true })
      .then(() => {
        this.props.folderInfo()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render(){
    return(
      <div>
        <p>FOLDERS</p>
        {
          this.props.folders.map((folder, index) => {
            let folderId = folder._id;
            return  <div key={index}>
                      <Link to={`/profile/folder/${folder._id}`}>
                        <FolderCard key={index} state={folder}/>
                      </Link>
                      <button key={index} onClick={(folder) => this.deleteProject(folderId)}> Del </button>
                    </div>
          })
        }
      </div>
    )
  }
}

export default Folder;