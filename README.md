# MyReads Project:

This is the repository that contains the code for the **MyReads** app. The MyReads project is a React application that was developed as the final project for [Udacity's React Nanodegree  program](https://www.udacity.com/course/react-nanodegree--nd019) part 1: React Fundamentals. Students of the course were responsible for developing the core react elements of the front end of this single page application. The backend server and the APIs that allow the app to search for new books, to add/remove books from the library and retrieve books saved in the library were provided by Udacity.


## Application Overview:
**MyReads** is a personal library application that allows a user to view, categorize and add/remove books to/from their personal MyReads library. Additionally the application allows users to search for books by author or title that they can then add to their library. Note: the  Books in the library are categorized and displayed on one of three bookshelves: "Currently Reading", "Want to Read" and "Read". Users can easily move a book to a different bookshelf within their library or remove a book completely from their library.

# Getting Started:
The following instructions will get the project up and running on your local machine for development and testing purposes.

## Prerequisites:

* [Node](https://nodejs.org/) - First, you'll need Node.js installed on your system so that you can use Node Package Manager (NPM) to install various pre-requisite packages needed to run React applications. If Node is not already installed on your system the following to links will give you instructions on how to install Node.js:

* [How to install on Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows)
* [How to install on Mac OS](http://blog.teamtreehouse.com/install-node-js-npm-mac)

## Installation Instructions:

Once Node is installed you need to run the following commands:

* `npm install` - this will install all project dependencies located in the package.json file.

* `npm start` - this will start the development and open a new browser window pointed to localhost:3000 where you can start interacting with the app


## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
