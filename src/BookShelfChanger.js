import React, { Component } from 'react'
import PropTypes from 'prop-types'
/* This component is responsible for displaying the select that shows a book's
  current shelf location and allows the user to change the books shelf location.

  When the user changes the shelf location the updateBookShelf (via onChange/changeShel prop) function
  located in App.js will use an BooksAPI method to change the shelf value in the DB.
  The BookShelfChanger is called from the DisplayBookShelf component.

  Note: If a user set's the shelf value to none it will removed from the myReads library
  To Udacity STAFF:
    In the starter HTML provided by Udacity the option value for "Move to..." & "None" options
    were both set to "none". This needs to be corrected in the next version of Udacity starter
    html as this caused a defect that was hard to track down and took me hours to locate
   */
class BookShelfChanger extends Component {

  static propTypes = {
		book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
	}

  render() {
    return(    
    <select value={this.props.book.shelf} onChange={this.props.changeShelf(this.props.book)}>
        <option value="blank" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}
export default BookShelfChanger
