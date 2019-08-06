import React, {Component} from 'react';

class ArtistGallery extends Component {
  
  showTattoos() {
    return (
      this.props.artist.artistTattoo.map((el, idx) => {
        return (
          <div key={idx}>
            <img src={el.image} alt={el.tag} width="200"/>
            <p>{el.tag.join(', ')}</p>
            {this.props.categories.map((cat, idx) => {
              return (
                el.category.includes(cat._id) ? <p key={idx}>{cat.tag}</p> : null
              )
            })}
            {this.props.user && (this.props.user._id === this.props.artist._id) &&  <button onClick={(e) => this.props.handleDeleteTattoo(e, el._id)}>Delete</button>}
          </div>
        )
      })
      )
    }

  render() {
    console.log('user', this.props.user);
    console.log('artist', this.props.artist);
    
    return(
      <div>
        {this.props.artist.artistTattoo.length > 0 ? this.showTattoos() : null}
        
      </div>   
    )
  }
}

export default ArtistGallery;