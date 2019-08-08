import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Components
import ArtistCard from './ArtistCard';

class FavoriteArtists extends Component {
  constructor(props){
    super(props);
  }

  deleteArtist(artist){
    axios.put(`${process.env.REACT_APP_API_URL}/api/favorite-artist-remove/${artist}`, {}, { withCredentials: true })
      .then(() => {
        this.props.artistInfo()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render(){
    return(
      <div className="fav-custom">
        <h6 className="text-uppercase pt-3 pb-3">Artists you liked</h6>
        {
          this.props.artists.map((artist, index) => {
            let artistId = artist._id;
            return  <div key={index}>
                      <ul className="list-unstyled">
                        <div className="d-flex align-items-center mt-5 art-div flex-wrap">
                          <Link className="card-art col-lg-10" to={`/artists/${artist._id}`}>
                            <ArtistCard key={index} state={artist} deleteArtist={(artist) => this.deleteArtist(artistId)}/>
                          </Link>
                            
                          <img className="col-lg-2 btn-artist-del mb-4" src="/images/trash-solid.svg"  onClick={(artist) => this.deleteArtist(artistId)}/> 
                        </div>
                      </ul>
                    </div>
          })
        }
      </div>
    )
  }
}

export default FavoriteArtists;