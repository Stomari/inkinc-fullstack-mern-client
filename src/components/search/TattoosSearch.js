import React, {Component} from 'react';
import { Masonry } from 'gestalt';
import ShowMansory from './ShowMasonry';
import 'gestalt/dist/gestalt.css';

const TattoosSearch = (props) => {
  const render = (data) => {
    return <ShowMansory
      user={props.user}
      openedImageSave={props.openedImageSave}
      openedImageSaveHandler={props.openedImageSaveHandler}
      handleShowModal={props.modal}{...data}
    />
  }

  return(
    <div className="search-tattoos-grid-container">
      <Masonry
        // comp={ShowMansory}
        comp={(data) => render(data)}
        items={props.filteredResults}
        columnWidth={260}
        minCols={1}
        virtualize
      />
    </div>
  );
}

export default TattoosSearch;