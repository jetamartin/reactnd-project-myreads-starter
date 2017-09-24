import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'

/* This controlled component allows the user to search for books by entering in their search criteria */

class BookSearch extends Component {
  static propTypes = {
    queryResults: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  /* This method captures the query string entered by the user and
  it calls the "retrieveBooks" function (in App.js) to execute the BookSearch
  and assign a shelf property to the returned results
  Note the search reasults are limited to 20 books. */
  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.props.onSearch(query, 20);
  }
  // This method is not currently used. Kept for future purposes if
  // I add an clear button to search input area
  clearQuery = (query) => {
    this.setState( { query: ''});
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={'/'} >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
             placeholder="Search by title or author"
             value={this.state.query}
             onChange={(event) => this.updateQuery(event.target.value)}
           />
          </div>
        </div>

        <div className="search-books-results">
        { (this.state.query !== undefined) && (this.state.query.length > 0) &&
          <ol className="books-grid">

          { ((this.props.queryResults) && (this.props.queryResults.length > 0)) && this.props.queryResults.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                {book.imageLinks !== undefined &&
                  <div className="book-cover"
                       style={{ width: 128, height: 158,
                       backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                  </div>
                }

                  <div className="book-shelf-changer">
                    <BookShelfChanger
                      book={book}
                      changeShelf={this.props.changeShelf}
                      />
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                  {book.authors !== undefined && book.authors.map((author, index) => (
                      <div key={index} className="book-authors">{author}
                      </div>
                  ))}
              </div>
            </li>
          ))}
          </ol>
          }
        </div>
      </div>
    )
  }
}


export default BookSearch
