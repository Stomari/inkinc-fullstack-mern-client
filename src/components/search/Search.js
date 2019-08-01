import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      searchQuery: '',
      results: ['teste', 'testando', 'abacate', 'testing', 'testani', 'amora', 'peixe', 'panqueca', 'aroeira'],
      filteredResults: [],
      clicked: false,
    }
  }

  submitHandler(value) {
    this.filterHandler(value);
  }

  searchHandler(event) {
    let { name, value } = event.target;
    this.submitHandler(value);
    this.setState({
      [name]: value
    });
  }

  filterHandler(value) {
    const results = this.state.results;
    const filterResults = results.filter(el => el.toLowerCase().includes(value.toLowerCase())).splice(0, 5);
    this.setState({
      filteredResults: filterResults,
      clicked: false,
    });
  }

  getResults() {
    let show = '';
    if (this.state.filteredResults.length <= 5 && this.state.searchQuery.length > 1) {
      const showResults = this.state.filteredResults;
      show = showResults.map((el, idx) => {
        return <div key={idx} className="search-autocomplete-item" onClick={() => this.selectSuggestion(el)}>{el}</div>
      });
    }

    if (this.state.filteredResults[0] === this.state.searchQuery && this.state.clicked) {
      show = '';
    }
    return show;
  }

  selectSuggestion(el) {
    this.setState({
      searchQuery: el,
    });
    this.submitHandler(el);
    this.setState({
      clicked: true,
    });
  }

  render() {
    console.log(this.state);
    return(
      <div className="search-bar">
        <input name="searchQuery" value={this.state.searchQuery} onChange={(event) => this.searchHandler(event)} />
        <div className="search-autocomplete-search">{this.getResults()}</div>
      </div>
    )
  }
}


export default Search;
