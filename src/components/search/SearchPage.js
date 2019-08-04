import React, {Component, Fragment} from 'react';
import SearchBar from './SearchBar';
import Categories from '../Categories';
import ArtistsTattoosToggle from './ArtistsTattoosToggle';
import ArtistsSearch from './ArtistsSearch';
import TattoosSearch from './TattoosSearch';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      chosenCategories: [],
      searchQuery: '',
      resultsTattoos: [],
      resultsArtists: [],
      filteredResults: [],
      clicked: false,
      searchByTatto: false,
      artistsSearch: false,
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

      let responseTattoos = '';
      let responseArtists = '';
      axios.get('http://localhost:8000/api/tattoo')
      .then(response => {
        responseTattoos = response.data;
        this.setState({
          resultsTattoos: responseTattoos,
        })

        axios.get('http://localhost:8000/api/artists')
        .then(response => {
          responseArtists = response.data;
          this.setState({
            resultsArtists: responseArtists,
          })

          const filtered = this.state.artistsSearch ? responseArtists : responseTattoos;
          this.setState({
            filteredResults: filtered,
          })

        })
        .catch(err => console.log(err));

      })
      .catch(err => console.log(err));
      

      this.getResults();
  }

  searchHandler(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.filterHandler(value);
  }

  filterHandler(value) {
    let filtered = this.state.filteredResults;
    // split user's input query
    const inputTags = value.split(' ').filter(el => el !== '');
    const chosenCategories = this.state.chosenCategories;

    // define results as Artists or Tattoos and search
    if (!this.state.artistsSearch) {
      const results = this.state.resultsTattoos;
      // filter results
      filtered = results.filter(result => {
        return (
          // compare tags and input query
          inputTags.every(tag => {
            return result.tag.some(rt => rt.includes(tag));
          })
          &&
          // compare categories
          chosenCategories.every(cc => {
            return result.category.some(rc => rc === cc);
          })
        )
      })
    } else {
      const results = this.state.resultsArtists;
      // filter results
      filtered = results.filter(result => {
        return (
          inputTags.every(tag => {
            return result.name.toLowerCase().includes(tag.toLowerCase());
          })
          &&
          chosenCategories.every(cc => {
            return result.category.some(rc => rc === cc);
          })
        )
      });
    }
    this.setState({
      filteredResults: filtered,
    });
  }

  getResults() {
    const showResults = this.state.filteredResults;
    
    return showResults.map((el, idx) => {
      if (!this.state.artistsSearch) {
        return <Link to={`/tatoos/${el._id}`} key={idx} className="search-autocomplete-item">{el.tag}</Link>
      } else {
        return <Link to={`/artist/${el._id}`} key={idx} className="search-autocomplete-item">{el.name}</Link>
      }
    });
  }

  chooseCategories(event) {
    const {checked, id} = event.target;
    if (checked) {
      this.state.chosenCategories.push(id);
    } else {
      this.state.chosenCategories.splice(this.state.chosenCategories.indexOf(id), 1);
    }
    this.filterHandler(this.state.searchQuery);
  }

  toggleHandler() {
    const changedArtistsSearch = !this.state.artistsSearch;
    const filtered = changedArtistsSearch ? this.state.resultsArtists : this.state.resultsTattoos;
    this.setState({
      artistsSearch: changedArtistsSearch,
      filteredResults: filtered,
      searchQuery: '',
    });
    this.getResults();
  }

  render() {
    return(
      <Fragment>
        <ArtistsTattoosToggle artistsSearch={this.state.artistsSearch} toggleHandler={() => this.toggleHandler()} />
        <SearchBar state={this.state} searchHandler={(event) => this.searchHandler(event)} getResults={() => this.getResults()} />
        <Categories categories={this.state.categories} chooseCategories={(e) => this.chooseCategories(e)} />

        {
          this.state.artistsSearch && 
          <ArtistsSearch filteredResults={this.state.filteredResults} getResults={() => this.getResults()} />
        }
        {
          !this.state.artistsSearch &&
          <TattoosSearch filteredResults={this.state.filteredResults} getResults={() => this.getResults()} />
        }

        <Footer />
      </Fragment>
    );
  }
}

// searchHandler={(event) => this.searchHandler(event)}

export default SearchPage;