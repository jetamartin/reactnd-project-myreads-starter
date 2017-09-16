import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {



  render() {
    {console.log(this)}
    return(
      <select defaultValue={this.props.shelf} >
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
