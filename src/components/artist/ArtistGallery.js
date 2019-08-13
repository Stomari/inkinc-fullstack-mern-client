import React, { Component, Fragment } from 'react';
import ShowMansory from '../search/ShowMasonry';
import ModalImage from '../search/ModalImage';
import {Masonry} from 'gestalt';
import axios from 'axios';
import 'gestalt/dist/gestalt.css';

class ArtistGallery extends Component {
  constructor(props){
    super(props)
    this.state = {
      itemsToRender: [],
      showModal: false,
      imageModal: '',
    }
  }

  openedImageSave(event, id, modal) {
    event.preventDefault();
    axios.get(`${process.env.REACT_APP_API_URL}/api/tattoo/${id}`, {withCredentials: true})
    .then(response => {
      const tattoo = response.data;
        this.setState({
          showModal: !this.state.imageModal,
          imageModal: tattoo,
        })
    })
    .catch(err => console.log(err));
  }

  renderData(data, key) {
    return <ShowMansory
      user={this.props.user}
      openedImageSave={this.props.openedImageSave}
      openedImageSaveHandler={(event, i, modal) => this.openedImageSave(event, i, modal)}
      handleShowModal={this.state.showModal}
      handleDeleteTattoo={(e, id) => this.props.handleDeleteTattoo(e, id)}
      artist={this.props.artist}
      {...data}
      artistGallery={true}
    />
  }

  loadMore() {
    this.state.itemsToRender.push(this.props.artist.artistTattoo);
    return this.state.itemsToRender;
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      imageModal: '',
    })
  }

  render() {
    return(
      <Fragment>
        <div>
          {this.props.artist.artistTattoo.length > 0 ? 
            <Masonry
            comp={(data) => this.renderData(data)}
            items={(this.props.artist.artistTattoo)}
            loadItems={() => this.loadMore()}
            scrollContainer={() => window}
            minCols={1}
          />
            : null}
        </div>
        {
          this.state.showModal &&
          <ModalImage user={this.props.user} shownTattoo={this.state.imageModal} handleCloseModal={() => this.handleCloseModal()} openedImageSaveHandler={(e, i, modal) => this.openedImageSaveHandler(e, i, modal)}/>          
        }
      </Fragment>
    )
  }
}

export default ArtistGallery;