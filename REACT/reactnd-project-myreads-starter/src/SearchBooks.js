import React from 'react'
import escapeRegExp from 'escape-string-regexp'

class SearchBooks extends React.Component{
  RenderBook(book){


    if(book.imageLinks){
      //If the book has an imagelnk -> some books have this field missing
     return (
         <div key={book.industryIdentifiers[0].identifer} className="book">
             <div className="book-top">

               <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
               <div className="book-shelf-changer">
                 <select value={this.props.shelf(book)} onChange={(e)=>this.props.update(e,book)}>
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
         )
    }
  }
   render(){
  var obj=this.props.search;

     return (
    <ol className="books-grid">
      {obj[0]&&!obj[0].error&&obj[0].map((book)=>this.RenderBook(book))}
    </ol>

   )
   }
}

export default SearchBooks
