import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelfChanger from './BookShelfChanger'

class BookSearch extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    console.log("Function: Update Query")
    console.log("Query: " + query)
    this.props.onSearch(query, 20)
  }

  clearQuery = (query) => {
    this.setState( { query: ''})
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/' onClick={this.forceUpdate}>Close</Link>
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
          {console.log("QueryResults passed into BookSearch: ")}
          {console.log(this.props.queryResults)}
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
                {console.log("Book passed from BookSearch into BookSelfChanger")}
                {console.log(book)}
                  <div className="book-shelf-changer">
                    <BookShelfChanger
                      book={book}
                      changeShelf={this.props.changeShelf}
                      />
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {/*console.log(book.authors)*/}
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
