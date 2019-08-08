import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return(
      <div className="search-bar pb-4 d-flex justify-content-center">
        <div className="search-space">
        <input name="searchQuery" value={this.props.state.searchQuery} placeholder="Find your next tattoo" onChange={(event) => this.props.searchHandler(event)} />
        <img className="loupe" src="/images/loupe.svg"/>

        </div>
      </div>
    )
  }
}


export default Search;
