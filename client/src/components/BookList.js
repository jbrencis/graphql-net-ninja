import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetail';

class BookList extends Component {
  state = {
    selected: null
  };

  displayBooks() {
    // from getBooksQuery  gql``
    const data = this.props.data;

    // from getBooksQuery  gql``
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={e => this.setState({ selected: book.id })}>
            {book.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div id="main">
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
