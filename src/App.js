import React from 'react'
import DisplayBookshelf from './DisplayBookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  updateBookShelf = (book) => { return (event) => {
        book.shelf = event.target.value
        this.setState({book: book});
  } }

  // API request to get books from DB
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
    })
  }
  render() {
    return (
      <div className="app">
        <DisplayBookshelf
          books={this.state.books}
          changeShelf={this.updateBookShelf}
        />
      </div>
    )
  }
}

export default BooksApp
