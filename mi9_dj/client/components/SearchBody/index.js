import React, {Component} from 'react';

import SearchResult from '../SearchResult';

export default class SearchBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.results);
    const results = this.props.results.map(function(item) {
      console.log('item', item);
      return (
        <SearchResult {...item}/>
      );
    });

    return (
      <div className="search-body">
        {results}
      </div>
    );
  }
}