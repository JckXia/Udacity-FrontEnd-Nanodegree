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

    books:[],
    search:[],
    temp:[],
     query:''
  }

  //Grabs all the book from 'this'user(tokenize)
  componentDidMount(){
   BooksAPI.getAll().then((books)=>{

      this.setState({books:books})

   })
  }

 //Function used for changing of shelves
  ShelfChange=(e,book)=>{

  book.shelf=e.target.value;

    BooksAPI.update(book,e.target.value).then((books)=>{


        var newData=this.state.books.concat([books]);



        this.setState({temp:newData})
    })


  }

 //Function used for adding a book to the collection

  AddBook=(e,book)=>{

  var collection=this.state.books;

  var index=-1;
  for(var i=0;i<collection.length;i++){
      if(collection[i].id==book.id){
           index=i;
      }
  }

book.shelf=e.target.value;
   if(index!==-1){
     //If book exits already, we first take it out, then we push the one  with new stat backin

     collection.splice(index,1);
   }


    collection.push(book);

  BooksAPI.update(book,e.target.value);



  }

  updateQuery=(query)=>{

   //First we clear the search state
   //This is done every time the query is updated
    this.setState({search:[]})
    BooksAPI.search(query).then((book)=>{
      var newBook=this.state.search.concat([book]);
    //Then we set a new state with the search, completed with new books
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
      <div className="search-books">
        <div className="search-books-bar">
          <Link
             to="/"
              className="close-search">Close</Link>

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
      )}/>

    <Route exact path="/" render={()=>(
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


      )}/>

      </div>
    )
  }
}

export default BooksApp
