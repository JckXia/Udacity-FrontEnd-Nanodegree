import React from 'react'

import * as BooksAPI from './BooksAPI'

class Shelf extends React.Component{
  state={
    foo:[]
  }


  render(){

     var collection=this.props.books.filter((book)=>book.shelf==this.props.stat);
       //Acquire books that is of current shelf
    return (
      <ol className="books-grid" >
        {collection.map((book)=>(

          <div  key={book.id} className="book">
              <div className="book-top">

                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e)=>this.props.update(e,book)}>
                    <option value="move" disabled>Move to...</option>


                     <option value="Foo" hidden>Foo </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>

))}

</ol>
    )
  }
}
export default Shelf
