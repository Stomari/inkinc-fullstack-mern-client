import React from 'react';
import axios from 'axios';

const ArtistsSearch = (props) => {

  const favArtist = (artistId) => {
    axios.put(`http://localhost:8000/api/favorite-artist/${artistId}`, {}, {withCredentials: true})
      .then(() => console.log('entrou na promise'))
      .catch(err => console.log(err));
  }

  return(
    <div className="artist-search-container">
      {
        props.filteredResults.map((el, idx) => {
          return (
            <div key={idx} className="artist-search-card">
              <div className="artist-search-info">
                <div className="artist-search-profile">
                  <img className="artist-search-profile-picture" src={el.image} alt={el.name + ' photo'}/>
                  <h4>{el.name}</h4>
                </div>
                {el.category.map((cat, idx) => <p key={idx}>{cat.tag}</p>)}
              </div>
              <div className="search-artst-tattoos-preview">
                {el.artistTattoo.splice(0, 5).map((tattoo, idx) => <img key={idx} src={tattoo.image} className="artist-search-tattoo-preview" alt={tattoo.tag} />)}
              </div>
              <p onClick={(id) => favArtist(el._id)}>Fav</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default ArtistsSearch;