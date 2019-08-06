import React, {Component} from 'react';

class Flashes extends Component {
  
  showFlashes() {
    return (
      this.props.artist.flash.map((el, idx) => {
        return (
          <div key={idx}>
            <img src={el.image} alt={el.tag} width="200"/>
            <p>{el.tag.join(', ')}</p>
            {this.props.categories.map((cat, idx) => {
              return (
                el.category.includes(cat._id) ? <p key={idx}>{cat.tag}</p> : null
              )
            })}
            <p>${el.price}</p>
            {this.props.user && (this.props.user._id === this.props.artist._id) &&  <button onClick={(e) => this.props.handleDeleteFlash(e, el._id)}>Delete</button>}
          </div>
        )
      })
      )
    }

  render() {
    return(
      <div>
        {this.props.artist.flash.length > 0 ? this.showFlashes() : null}
        
      </div>   

    )
  }
}

export default Flashes;