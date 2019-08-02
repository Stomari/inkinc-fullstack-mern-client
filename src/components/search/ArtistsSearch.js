import React from 'react';

const ArtistsSearch = (props) => {
  console.log(props);
  return(
    props.getResults()
  );
}

export default ArtistsSearch;