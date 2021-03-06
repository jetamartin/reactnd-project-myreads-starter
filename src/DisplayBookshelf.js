import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

/* This component is responsible for displaying all books that are currently in the myReads library
and displayig them on their respective shelf. It also calls the BookShelfChanger component that allows
the user to change the books shelf location  */
class DisplayBookshelf extends Component {
  static propTypes = {
		books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
	}

  render() {
    const booksReading = this.props.books.filter((book) => book.shelf === "currentlyReading");
    const booksRead = this.props.books.filter((book) => book.shelf === "read");
    const booksWantToRead = this.props.books.filter((book) => book.shelf === "wantToRead");
    const readCategory = [booksReading, booksWantToRead, booksRead];
    const categoryName = ["Currently Reading", "Want to Read", "Read"];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">

            {readCategory.map((category, index) => (
            <div key={index}>
              <div className="bookshelf">
              <h2 className="bookshelf-title">{categoryName[index]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                {category.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 158,
                          backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                        </div>
                        <div className="book-shelf-changer">

                          <BookShelfChanger
                            book={book}
                            changeShelf={this.props.changeShelf}

                            />
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      {book.authors && book.authors.map((author, index) => (
                          <div key={index} className="book-authors">{author}</div>
                      ))}
                    </div>
                  </li>
                ))}
                  </ol>
                </div>
              </div>
            </div>
            ))}
            {/* This element (displayed as a "+" at the bottom of the page allows the user to navigate
                to the '/search' screen ()
            */}
            <div className="open-search">
              <Link to="/search" onClick={() => {}}>Add a book</Link>
            </div>
        </div>
      </div>
    )
  }
}
export default DisplayBookshelf
