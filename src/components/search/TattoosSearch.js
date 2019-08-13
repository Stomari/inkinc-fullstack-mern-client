import React, { Component } from 'react';
import { Masonry } from 'gestalt';
import ShowMansory from './ShowMasonry';
import axios from 'axios';
import 'gestalt/dist/gestalt.css';

class TattoosSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      itemsToRender: [],
    }  
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.filteredResults !== prevState.itemsToRender) {
      return {itemsToRender: nextProps.filteredResults}
    }
  }

  renderData(data) {
    return  (
      <ShowMansory
        user={this.props.user}
        openedImageSave={this.props.openedImageSave}
        openedImageSaveHandler={this.props.openedImageSaveHandler}
        handleShowModal={this.props.modal}
        {...data}
      />
    )
  }

  loadMore() {
    const newArr = [...this.props.filteredResults];
    this.setState({
      itemsToRender:  newArr
    });
  }

  render() {
    return(
      <div className="search-tattoos-grid-container">
        <Masonry
          key={this.props.filteredResults.length}
          comp={(data) => this.renderData(data)}
          items={(this.state.itemsToRender)}
          loadItems={() => this.loadMore()}
          scrollContainer={() => window}
          minCols={1}
          virtualize
        />
      </div>
    )
  }
}

export default TattoosSearch;
