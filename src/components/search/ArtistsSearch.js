import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ArtistsSearch = (props) => {

  const favArtist = (artistId) => {
    if (!props.user.favoriteArtist.some(el => el._id === artistId)) {
      axios.put(`${process.env.REACT_APP_API_URL}/api/favorite-artist/${artistId}`, {}, {withCredentials: true})
        .then(() => {
          props.getInfo();
        })
        .catch(err => console.log(err));
    }
  }

  const deleteArtist = (artist) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/favorite-artist-remove/${artist}`, {}, { withCredentials: true })
      .then(() => {
        props.getInfo()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return(
    <div className="artist-search-container">
      {
        props.filteredResults.map((el, idx) => {
          return (
            <div key={idx} className="artist-search-card">
              <Link to={`/artists/${el._id}`}>
                <div className="artist-search-info">
                  <div className="artist-search-profile">
                    <img className="artist-search-profile-picture" src={el.profileImg} width={60} alt={el.name + ' photo'}/>
                    <h4>{el.name}</h4>
                  </div>
                  {el.category.map((cat, idx) => <p key={idx}>{cat.tag}</p>)}
                </div>
                {/* <div className="search-artst-tattoos-preview">
                  {el.artistTattoo.filter((el, i) => i < 5).map((e, idx) => <img key={idx} src={e.image} className="artist-search-tattoo-preview" alt={e.tag} />)}
                </div> */}
              </Link>
                {
                  !props.user.favoriteArtist.some(fav => fav._id === el._id) ?
                  <p style={{cursor: 'pointer'}} onClick={(id) => favArtist(el._id)}>Imagem de ícone pra favoritar</p>
                  : <p style={{cursor: 'pointer'}} onClick={(id) => deleteArtist(el._id)}>Imagem de ícone favoritado</p>
                }
            </div>
          )
        })
      }
    </div>
  );
}

export default ArtistsSearch;