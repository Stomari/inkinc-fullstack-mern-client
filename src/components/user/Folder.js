import React, {Component} from 'react';
import axios from 'axios';

//Components
import FolderCard from './FolderCard';

class Folder extends Component {
  constructor(props){
    super();
    this.state = {
     folders: []
    }
  }


  render(){
    return(
      <div>
        {
            this.props.user.folder.map((folder, index) => {
            return <FolderCard key={index} state={folder}/>
          })
        }
      </div>
    )
  }
}

export default Folder;