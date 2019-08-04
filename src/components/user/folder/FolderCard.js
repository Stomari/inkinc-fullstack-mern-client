import React from 'react';

const FolderCard = (props) => {

    return(
      <div className="card mr-4 card-custom" style={{"width": "20rem"}}>
        <picture>
          {/* grid image */}
          <img src="/images/teste-folder.jpeg" className="card-img-top"  style={{"height": "15rem"}} alt="..."/>
        </picture>
        <div className="card-body">
          <p className="card-text">
            {props.state.name}
          </p>
        </div>
      </div>
    )
}
export default FolderCard;