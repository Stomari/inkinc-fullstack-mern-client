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
    console.log('props', this.props)
  }

  // showModalHandle(event) {
  //   event.preventDefault();
  //   const currentState = !this.state.showModal;
  //   this.setState({
  //     showModal: currentState,
  //   })
  // }

  openedImageSave(event, id, modal) {
    event.preventDefault();
    axios.get(`${process.env.REACT_APP_API_URL}/api/tattoo/${id}`, {withCredentials: true})
    .then(response => {
      const tattoo = response.data;
      console.log('tattoo', tattoo)
      // const idx = !this.state.openedImageSave ? id : ''
        this.setState({
          showModal: !this.state.imageModal,
          imageModal: tattoo,
        })
    })
    .catch(err => console.log(err));
  }

  renderData(data) {
    return <ShowMansory
      user={this.props.user}
      openedImageSave={this.props.openedImageSave}
      openedImageSaveHandler={(event, i, modal) => this.openedImageSave(event, i, modal)}
      handleShowModal={this.state.showModal}
      {...data}
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

  // showTattoos() {
    // return (
      // this.props.artist.artistTattoo.map((el, idx) => {
      //   return (
      //     <div key={idx}>
      //       <img src={el.image} alt={el.tag} width="200" />
      //       <p>{el.tag.join(', ')}</p>
      //       {this.props.categories.map((cat, idx) => {
      //         return (
      //           el.category.includes(cat._id) ? <p key={idx}>{cat.tag}</p> : null
      //         )
      //       })}
      //       {this.props.user && (this.props.user._id === this.props.artist._id) && <button onClick={(e) => this.props.handleDeleteTattoo(e, el._id)}>Delete</button>}
      //     </div>
      //   )
      // })
    // )
  // }

  render() {
    console.log('state: ', this.state)
    return(
      <Fragment>
        <div>
          {this.props.artist.artistTattoo.length > 0 ? 
            <Masonry
            // comp={ShowMansory}
            comp={(data) => this.renderData(data)}
            items={(this.props.artist.artistTattoo)}
            loadItems={() => this.loadMore()}
            scrollContainer={() => window}
            // columnWidth={260}
            minCols={1}
            // virtualize
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