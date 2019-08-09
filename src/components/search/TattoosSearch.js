import React, { Component } from 'react';
import { Masonry } from 'gestalt';
import ShowMansory from './ShowMasonry';
import 'gestalt/dist/gestalt.css';

class TattoosSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      itemsToRender: [],
    }
  }

  renderData(data) {
    return <ShowMansory
      user={this.props.user}
      openedImageSave={this.props.openedImageSave}
      openedImageSaveHandler={this.props.openedImageSaveHandler}
      handleShowModal={this.props.modal}
      {...data}
    />
  }

  loadMore() {
    this.state.itemsToRender.push(this.props.filteredResults);
    return this.state.itemsToRender;
  }

  render() {
    return(

      <div className="search-tattoos-grid-container" id="teste">
      <Masonry
        // comp={ShowMansory}
        comp={(data) => this.renderData(data)}
        items={(this.props.filteredResults)}
        loadItems={() => this.loadMore()}
        scrollContainer={() => window}
        // columnWidth={260}
        minCols={1}
        // virtualize
      />
    </div>
    )
  }
}

export default TattoosSearch;