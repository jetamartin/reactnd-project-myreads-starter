import React from 'react'
import { Route } from 'react-router-dom'
import DisplayBookshelf from './DisplayBookshelf'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    queryResults: []
  }

  updateBookShelf = (book) => { return (event) => {
        book.shelf = event.target.value;
        // this.setState({book: book});
        BooksAPI.update(book,event.target.value).then((book) => {
          this.setState({book: book});


      }).then(() => {
          BooksAPI.getAll().then((books) => {
          this.setState({ books: books});
        })
      })
  } }

  // API request to get books from DB
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books});
    })
  }

  retrieveBooks = (query, maxResults) => {
    if (query.length > 0 ) {
      BooksAPI.search(query, maxResults).then((queryResults) => {
        if (queryResults.length !== undefined) {
          queryResults.map((queryResult) => {
          return this.state.books.map((book) => {
            if (book.id === queryResult.id) {
              queryResult.shelf = book.shelf;
            }
            return queryResults;
          })
        }) // End of queryResults.map function

        let addMissingShelf = () => queryResults.map((queryResult) => {
            if (queryResult.shelf === undefined) {
                queryResult.shelf = "none";
              }
              return queryResults;
            }
          ) // End addMissingShelf function
          addMissingShelf();
        }
        this.setState({ queryResults : queryResults});
      }) // End of BooksAPI function
    }
  } // End of retrieveBooks function

  render() {
    return (

      <div className="app">
        <Route exact path="/" render={() => (
          <DisplayBookshelf
            books={this.state.books}
            changeShelf={this.updateBookShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <BookSearch
            queryResults={this.state.queryResults}
            onSearch={this.retrieveBooks}
            changeShelf={this.updateBookShelf}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
