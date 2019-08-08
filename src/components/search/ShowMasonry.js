import React from 'react';
import ImagesLoaded from 'react-images-loaded';

const ShowMansory = (props) => {
  return(
    <ImagesLoaded
        // elementType={'ul'} // defaults to 'div'
        className={'your-container-class'} // defaults to 'images-loaded-container'
        // onAlways={this.handleOnAlways}
        // onProgress={this.handleOnProgress}
        // onFail={this.handleOnFail}
        // done={this.handleDone}
        background=".image" // true or child selector
      >
        {/* Your images */}
        <div className="search-grid-image-wrapper">
          
          <img width="100%" src={props.data.image} alt={props.data.tag} className="search-grid-image" onClick={(event, i, modal) => props.openedImageSaveHandler(event, props.data._id, 'image')}/>

          {props.user && props.user.role === 'User' && <div className="search-grid-overlay" onClick={(event, i, modal) => props.openedImageSaveHandler(event, props.data._id, 'folder')}>+</div>}

        </div>
      </ImagesLoaded>

    
  );
}

export default ShowMansory;