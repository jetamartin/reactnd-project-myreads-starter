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
    // console.log("RetrieveBooks/UpdateQuery");
    // console.log(query);
    // console.log("Books State");
    // console.log(this.state.books)

    BooksAPI.search(query, maxResults).then((queryResults) => {
      queryResults.map((queryResult) => {
      return this.state.books.map((book) => {
        if (book.id === queryResult.id) {
          queryResult.shelf = book.shelf;
        }
        return queryResults
      })
    }) // End of queryResults.map function

    var addMissingShelf = () => queryResults.map((queryResult) => {
        if (queryResult.shelf === undefined) {
            queryResult.shelf = "none";
          }
          return queryResults;
        }
      ) // End addMissingShelf function

      addMissingShelf();
      this.setState({ queryResults : queryResults})
    }) // End of BooksAPI function
  } // End of retrieveBooks function


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
        {console.log(this.state.books)}
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
