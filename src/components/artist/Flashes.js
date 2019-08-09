import React, {Component} from 'react';

class Flashes extends Component {
  
  showFlashes() {
    return (
      this.props.artist.flash.map((el, idx) => {
        return (
          <div class="card card-flash search-grid-image-wrapper">
            <img src={el.image} alt={el.tag} className="search-grid-image card-flash-img" style={{width:'100%', padding: '5px'}}/>
              <div class="card-body">
                {/* <p>{el.tag.join(', ')}</p> */}
                {/* {this.props.categories.map((cat, idx) => {
                  return (
                    el.category.includes(cat._id) ? <p key={idx}>{cat.tag}</p> : null
                  )
                })} */}
                <p>${el.price}</p>
                {this.props.user && (this.props.user._id === this.props.artist._id) &&  <div className="search-grid-overlay" onClick={(e) => this.props.handleDeleteFlash(e, el._id)}><img src="/images/trash-solid.svg" alt="trash icon" className="trash-ico"/></div>}
            </div>
          </div>

        )
      })
      )
    }


  render() {
    return(
      <div class="flashes-container">
          {this.props.artist.flash.length > 0 ? this.showFlashes() : null}
      </div>   

    )
  }
}

export default Flashes;