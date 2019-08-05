import React, {Component} from 'react';

//Components
import FolderCard from './FolderCard';

class Folder extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
        <div className="card-deck group-custom d-flex align-items-center justify-content-center ml-3">
        {
          this.props.folders.map((folder, index) => {
            let folderId = folder._id;
            return  <div key={index}>
                      <div key={index} className="container-custom2 mb-3">
                        <FolderCard getInfo={this.props.foldersInfo} key={index} deleteFolder={(folder) => this.deleteFolder(folderId)} state={folder}/>
                      </div>
                    </div>
          })
        }
        </div>
    )
  }
}

export default Folder;