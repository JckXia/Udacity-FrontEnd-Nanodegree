import React from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'


import escapeRegExp from 'escape-string-regexp'

class BooksApp extends React.Component {
  state = {

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
    search:[],
    temp:[],
     query:''
  }
  componentDidMount(){
   BooksAPI.getAll().then((books)=>{
    // console.log(books);
  //  console.log(books);
      this.setState({books:books})

   })
  }

  ShelfChange=(e,book)=>{

  book.shelf=e.target.value;

    BooksAPI.update(book,e.target.value).then((books)=>{


        var newData=this.state.books.concat([books]);

      console.log(newData);

        this.setState({temp:newData})
    })
  //Make changes to the state here.

  }

  AddBook=(e,book)=>{

  var collection=this.state.books;
//    console.log(collection[0].id);
       for(var i=0;i<collection.length;i++){
         if(collection[i].id==book.id){
           return;
         }
       }
    book.shelf=e.target.value;
     collection.push(book);
      BooksAPI.update(book,e.target.value);
  }

  updateQuery=(query)=>{

    this.setState({search:[]})
    BooksAPI.search(query).then((book)=>{
      var newBook=this.state.search.concat([book]);
      //book -->a 1d array
      //book[0] --> an individual item
      //  {book&&console.log(book)}
     {console.log(this.state.search.length)}



   this.setState({search:newBook});
    })
    this.setState({query:query})
  }
  //Idea 1: Get books based on input
  //Idea 2: First, find all the books, then filter them out
  render() {

    return (

      <div className="app">
    <Route path="/search" render={()=>(
        <div>Hi</div>
      )}/>
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">

                {

              }

                <input
                   value={this.state.query}
                   onChange={(event)=>this.updateQuery(event.target.value)}
                   type="text"
                    placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">

                <ol className="books-grid">
              <SearchBooks search={this.state.search} update={this.AddBook}/>
               </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Shelf stat="currentlyReading" books={this.state.books} update={this.ShelfChange}/>

                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                     <Shelf stat="wantToRead" books={this.state.books} update={this.ShelfChange}/>
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                        <Shelf stat="read" books={this.state.books} update={this.ShelfChange}/>


                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="open-search">
              <Link
                 to="/search">Add a Book</Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
