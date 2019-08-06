import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return(
      <div className="search-bar">
        <input name="searchQuery" value={this.props.state.searchQuery} placeholder="Search..." onChange={(event) => this.props.searchHandler(event)} />
      </div>
    )
  }
}


export default Search;
