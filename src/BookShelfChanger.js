import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {

  static propTypes = {
		book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
	}

  render() {
    console.log(this.props.book)
    return(
      /* <select defaultValue={this.props.book.shelf} onChange={this.props.changeShelf} > */
			/*<button onClick={() => onDeleteContact(contact)} className='contact-remove'> */
      //<select defaultValue={this.props.book.shelf} onChange={() => this.props.changeShelf(this.props.book)} >

      // <select defaultValue={this.props.book.shelf} onChange={this.props.changeShelf} >
      //  <select defaultValue={this.props.book.shelf} onChange={this.handleChange(this.props.book)} >


    <select value={this.props.book.shelf} onChange={this.props.changeShelf(this.props.book)}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}
export default BookShelfChanger
