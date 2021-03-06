import React, { Component } from 'react';
import { Masonry } from 'gestalt';
import ShowMansory from './ShowMasonry';
import axios from 'axios';
import 'gestalt/dist/gestalt.css';

class TattoosSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsToRender: [],
    }
  }

  componentDidMount() {
    if (this.props.searchQuery.length === 0 && this.props.chosenCategories.length === 0) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/tattoo`, { withCredentials: true })
        .then(response => {
          const responseTattoos = response.data;
          this.setState({
            itemsToRender: responseTattoos,
          })
        })
    } else {
      const newArr = [...this.props.filteredResults]
      this.setState({
        itemsToRender: newArr
      })
    }
  }
  
  renderData(data) {
    return (
      <ShowMansory
        user={this.props.user}
        openedImageSave={this.props.openedImageSave}
        openedImageSaveHandler={this.props.openedImageSaveHandler}
        handleShowModal={this.props.modal}
        {...data}
      />
    )
  }

  render() {
    return (
      <div className="search-tattoos-grid-container">
        <Masonry
          key={this.state.itemsToRender}
          comp={(data) => this.renderData(data)}
          items={(this.state.itemsToRender)}
          minCols={1}
        />
      </div>
    )
  }
}

export default TattoosSearch;
