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
    axios.delete(`http://localhost:8000/api/favorite-artist-remove/${artist}`, { withCredentials: true })
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
        <p className="text-uppercase pt-3">Artists you liked</p>
        {
          this.props.artists.map((artist, index) => {
            let artistId = artist._id;
            return  <div>
                      <ul class="list-unstyled">
                        <Link to={`/profile/artist/${artist._id}`}>
                          <ArtistCard key={index} state={artist} deleteArtist={(artist) => this.deleteArtist(artistId)}/>
                        </Link>
                      </ul>
                    </div>
          })
        }
      </div>
    )
  }
}

export default FavoriteArtists;