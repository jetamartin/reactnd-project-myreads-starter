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
        book.shelf = event.target.value
        console.log(book.title)
        console.log(event.target.value)
        this.setState({book: book});
        BooksAPI.update(book,event.target.value).then((book) => {
          this.setState({book: book})
        })
        // this.setState({queryResults: book})
  } }

  // API request to get books from DB
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
    })
  }

  retrieveBooks = (query, maxResults) => {
    console.log("RetrieveBooks/UpdateQuery");
    console.log(query);
    BooksAPI.search(query, maxResults).then((queryResults) => {
      this.setState({ queryResults: queryResults});
    })

    /* Identify books if any of the books returned in the query results
    match books already in the MyReads library..if so we will need to set it's shelf equal
    to the shelf value in the library (Books).
    Note: If queryResults returns no results no need to continue
    */
      if ((this.state.queryResults !== undefined) && (this.state.queryResults.length > 0) ) {
      var matches =  this.state.queryResults.filter((queryResult) => {
          return this.state.books.some((inLibrary) => {
            if (queryResult.id === inLibrary.id) {
              queryResult.shelf = inLibrary.shelf
            }
            return queryResult.id === inLibrary.id
        })
      })

      console.log("Matches: ")
      console.log(matches);

      // Update bookshelf setting to match setting in MyReads library
      this.setState({queryResults : matches});

      console.log("QueryResults after merging in Bookshelf shelf positions: ")
      console.log(this.state.queryResults)

      // For books returned in query that aren't in library you need to create a  "shelf" value and set it  to "none"
      // as books in DB don't have a "shelf" attribute
      var missingShelfAdded = this.state.queryResults.filter((queryResult) => {
        if (queryResult.shelf === undefined) {
          queryResult.shelf = "none"
        }
        return queryResult;
      });

      console.log("missingShelfAdded: " + missingShelfAdded.length);
      console.log(missingShelfAdded);

      console.log("==> QueryResults (with Shelf info..including 'none') on exit from RetriveBooks")

      // Now update queryResults so that it has
      this.setState({queryResults: missingShelfAdded})
      console.log(this.state.queryResults)
    }
  } // End Of RetrieveBooks Function

  // *** This Function is not currently used: Tried to use setStete to force re-render of UI to reflect books
  // added in BookSearch. Didn't work so I used forceUpdate in BookSearch when user clicks app back link
  refreshState = (queryResults) =>  { this.setState(this.state.books: queryResults) }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <DisplayBookshelf
            books={this.state.books}
            changeShelf={this.updateBookShelf}
          />
        )}/>
        {console.log("========> QueryResults: Called from within App.js JSX")}
        {console.log(this.state.queryResults)}
        {/* Note onClick method not currently used because it's not achieving desired results.
        Leaving it  in right now as placeholder*/}
        <Route path="/search" render={() => (
          <BookSearch
            queryResults={this.state.queryResults}
            onSearch={this.retrieveBooks}
            changeShelf={this.updateBookShelf}
            onClick={this.refreshState}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
