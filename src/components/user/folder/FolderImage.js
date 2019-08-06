import React from 'react';

const FolderImage = (props) => {
  
  console.log('teste dentro da folder', props)
    return(
      <div>
        <img src={props.image.image} alt=''/>
      </div>
    )
}

export default FolderImage;