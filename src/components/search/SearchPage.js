import React, {Component, Fragment} from 'react';
import SearchBar from './SearchBar';
import Categories from '../Categories';
import ArtistsSearch from './ArtistsSearch';
import TattoosSearch from './TattoosSearch';
import Footer from '../Footer';
import axios from 'axios';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      chosenCategories: [],
      searchQuery: '',
      results: [],
      filteredResults: [],
      clicked: false,
      searchByTatto: false,
    }
  }


  componentDidMount() {
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        const categories = response.data;
        this.setState({
          categories,
        })
      })
      .catch(err => console.log(err));

      axios.get('http://localhost:8000/api/tattoo')
      .then(response => {
        const results = response.data;
        this.setState({
          results,
          filteredResults: results,
        })
      })
      .catch(err => console.log(err));
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
    const filterResults = results.filter(el => {
      const tagsStr = el.tag.filter(el => {
        return el.toLowerCase().includes(value.toLowerCase());
      });
      console.log('--> ', el);
      return (
        tagsStr.join().includes(value)
        // this.state.chosenCategories.forEach(category => el.categories.includes(category))
      )
    });
    this.setState({
      filteredResults: filterResults,
      clicked: false,
    });
  }

  getResults() {
    let show = '';
    // if (this.state.filteredResults.length <= 5 && this.state.searchQuery.length > 0) {
      const showResults = this.state.filteredResults;
      console.log('FILTERED RESULTS: ', this.state.filteredResults);
      show = showResults.map((el, idx) => {
        return <div key={idx} className="search-autocomplete-item">{el.tag}</div>
      });
    // }

    if (this.state.filteredResults[0] === this.state.searchQuery && this.state.clicked) {
      show = '';
    }
    return show;
  }

  // selectSuggestion(el) {
  //   this.setState({
  //     searchQuery: el,
  //   });
  //   this.submitHandler(el);
  //   this.setState({
  //     clicked: true,
  //   });
  // }

  chooseCategories(event) {
    const {checked, id} = event.target;
    if (checked) {
      this.state.chosenCategories.push(id);
    } else {
      this.state.chosenCategories.splice(this.state.chosenCategories.indexOf(id), 1);
    }
  }

  render() {
    return(
      <Fragment>
        <SearchBar state={this.state} searchHandler={(event) => this.searchHandler(event)} getResults={() => this.getResults()}/>
        <Categories categories={this.state.categories} chooseCategories={(e) => this.chooseCategories(e)} />
        <TattoosSearch filteredResults={this.state.filteredResults}/>
        <ArtistsSearch />
        <Footer />
      </Fragment>
    );
  }
}

export default SearchPage;