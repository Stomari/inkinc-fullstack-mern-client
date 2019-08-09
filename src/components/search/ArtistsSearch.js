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

  const findCategory = (id) => {
    return props.categories.filter(cat => cat._id === id)
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
                    <img className="artist-search-profile-picture" src={el.profileImg} alt={el.name + ' photo'}/>
                    <div className="artist-search-profile-text">
                      <h4>{el.name}</h4>
                      <p className="search-artist-category">
                        {el.category.map((cat, idx) => {
                          const res = findCategory(cat);
                          return res[0].tag + ' / '
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
                <div className="search-artist-tattoos-preview">
                  <div class="artist-search-latest">
                    {el.artistTattoo.filter((el, i) => i < 5).map((e, idx) => <img key={idx} src={e.image} className="artist-search-tattoo-preview" alt={e.tag} />)}
                  </div>
                  <div class="artist-search-fav-btn">
                  {
                    !props.user.favoriteArtist.some(fav => fav._id === el._id) ?
                    <p style={{cursor: 'pointer'}} onClick={(id) => favArtist(el._id)}>s2</p>
                    : <p style={{cursor: 'pointer'}} onClick={(id) => deleteArtist(el._id)}>s2</p>
                  }
                  </div>
               </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default ArtistsSearch;