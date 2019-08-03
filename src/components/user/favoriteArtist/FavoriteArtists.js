import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Components
import ArtistCard from './ArtistCard';

class FavoriteArtists extends Component {
  constructor(props){
    super(props);
  }

  deleteProject(artist){
    axios.delete(`http://localhost:8000/api/favorite-artist-remove/${artist}`, { withCredentials: true })
      .then(() => {
        this.props.artistInfo()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render(){
    console.log(this.props.artists)
    return(
      <div>
        {
          this.props.artists.map((artist, index) => {
            let artistId = artist._id;
            return  <div>
                      <Link to={`/profile/artist/${artist._id}`}>
                        <ArtistCard key={index} state={artist}/>
                      </Link>
                      <button key={index} onClick={(artist) => this.deleteProject(artistId)}> Del </button>

                    </div>
          })
        }
      </div>
    )
  }
}

export default FavoriteArtists;