import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  };

  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    // from getBooksQuery  gql``
    // const data = this.props.data;

    // from getBooksQuery  gql``
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    const { name, genre, authorId } = this.state;
    // `variables` default const in graphql
    this.props.addBookMutation({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
  // `name` needs to make it this.props.addBookMutation in `submitForm`
)(AddBook);
