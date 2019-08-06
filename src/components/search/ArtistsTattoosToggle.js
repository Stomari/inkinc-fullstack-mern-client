import React from 'react';

const ArtistsTattoosToggle = (props) => {
  return(
    <div className="search-toggle">
      <input id="artists-search-toggle" type="checkbox" name="artists-search" checked={props.artistsSearch} onChange={() => props.toggleHandler()} />
      <label htmlFor="artists-search-toggle">Artists</label>
      <input id="tattoos-search-toggle" type="checkbox" name="tattoos-search" checked={!props.artistsSearch} onChange={() => props.toggleHandler()} />
      <label htmlFor="tattoos-search-toggle">Tattoos</label>
    </div>
  );
}

export default ArtistsTattoosToggle;