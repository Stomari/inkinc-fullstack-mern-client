import React, {Component} from 'react';
import axios from 'axios';
import {Masonry} from 'gestalt';
import FolderMasonry from './FolderMasonry';

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
    return <FolderMasonry {...data} detailsProps={this.props} getInfo={() => this.props.getUser()} />
  }

  render(){
    return (  
      <div className="container">
        <h2>{this.state.folder.name}</h2>
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