import React from 'react';

const FolderCard = (props) => {

    return(
      <div>
        <picture>
          {/* grid image */}
          <img src={props.state.image} alt=''/>
        </picture>
        <p>
        {props.state.name}
        {/* <Link>Edit</Link> */}
        </p>
      </div>
    )
}

export default FolderCard;