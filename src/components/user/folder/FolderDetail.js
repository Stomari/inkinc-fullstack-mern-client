import React, {Component} from 'react';
import axios from 'axios';

//Components
import FolderImage from './FolderImage';

class FolderDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      folder: []     
    }
    
  }

  componentWillMount(){
    axios.get('http://localhost:8000/api/user', {withCredentials: true})
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
  

  render(){
       if(this.state.folder.image === undefined){
        return(
         <p>TESTE</p>
        )
       } else {
         return (
          <div>
           <p> {this.state.folder.name}</p>
          { 
            this.state.folder.image.map((img, index) => {
            return <FolderImage key={index} image={img}/>
            })
          }
         </div>
       )
       }
   
  }
}

export default FolderDetail;