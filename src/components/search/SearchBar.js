import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return(
      <div className="search-bar">
        <input name="searchQuery" value={this.props.state.searchQuery} onChange={(event) => this.props.searchHandler(event)} />
        <div className="search-autocomplete-search">{this.props.getResults()}</div>
      </div>
    )
  }
}


export default Search;
