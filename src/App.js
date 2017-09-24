import React from 'react'
import { Route } from 'react-router-dom'
import DisplayBookshelf from './DisplayBookshelf'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import './App.css'


/* This component is the "main" component of the application. It is responsible
  for either calling the DisplayBookshelf component to display all books in myReads library
  or calling the BookSearch component where a user can initiate a book search */

class BooksApp extends React.Component {
  state = {
    books: [],
    queryResults: []
  }
  //
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

  /* Once the main component is loaded this method issues a API call to retrieve all books that
    have were previously added to the myReads library.
    Note: the books returned already have a shelf property.
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books});
    })
  }


  /*   This retrieveBooks method uses an API to retrieve books stored in a DB using the search query string
    entered by user on BookSearch screen (component), Book search results do not include a bookshelf
    property (as that property is specific to this app) so this method adds a bookshelf property
    to the query results. If a book returned in the query results already exists in the myReads library
    you will want to add and set the shelf property to indicate the shelf where that book exist in the
    myReads library (e.g., shelf : "currentlyReading" || "reading" || "read") so that the user can see that
    the book already is in the library. Books that are not currently in the library will have their
    shelf property set to shelf : "none".

    The logic to set a books shelf property occurs in two phases.

    Phase 1: First phase is to check if the book exist in the library by comparing the unique
    book.id of books returned in query (queryResults) to the books.id of books already in the
    library (mainted in books state). If there is a match then set queryResults shelf property
    to shelf property of book already in the library.

    Phase 2: (via addMissingShelf function) sets the shelf property to "none" for any books
    that didn't get a shelf property assigned in phase 1.

    Note: there is probably a better way to achieve these results (i.e., in a single phase) but
    I wasn't able to get that to work...so this code will examined for re-factoring in the future.
    But it works for now.
  */
  retrieveBooks = (query, maxResults) => {
    // Only want to search for books if user has specified a query string.
    // This also handles scenario enters a search query and then deletes
    // the query string...don't want to initiate query with empty query string
    if (query.length > 0 ) {
      // Phase 1: See comments above
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

        // Phase 2: Set shelf property to "none" for any books in queryResult that didn't
        // already have a shelf property assigned in Phase 1.
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
