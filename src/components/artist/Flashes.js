import React, {Component} from 'react';

class Flashes extends Component {
  
  showFlashes() {
    return (
      this.props.artist.flash.map((el, idx) => {
        return (
          <div class="card card-flash m-5">
            <img src={el.image} alt={el.tag} style={{width:'100%', padding: '5px'}}/>
              <div class="card-body">
                {/* <p>{el.tag.join(', ')}</p> */}
                {/* {this.props.categories.map((cat, idx) => {
                  return (
                    el.category.includes(cat._id) ? <p key={idx}>{cat.tag}</p> : null
                  )
                })} */}
                <p>${el.price}</p>
                {/* {this.props.user && (this.props.user._id === this.props.artist._id) &&  <button onClick={(e) => this.props.handleDeleteFlash(e, el._id)}>Delete</button>} */}
            </div>
          </div>

        )
      })
      )
    }

  previous() {
    console.log('clicou');
    let left = this.cont.style.left;
    console.log('LEFT', left);
    left = left + 50 + 'px';
    console.log(this.cont.style.left)
  }

  render() {
    return(
      <div class="flashes-container" ref={ref => this.cont = ref}>
        <button style={{position: 'absolute', left: 0, zIndex: '999'}} onClick={() => this.previous()}>P</button>
        {this.props.artist.flash.length > 0 ? this.showFlashes() : null}
        <button style={{position: 'absolute', right: 0}} onClick={() => this.next()}>N</button>
      </div>   

    )
  }
}

export default Flashes;