import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
