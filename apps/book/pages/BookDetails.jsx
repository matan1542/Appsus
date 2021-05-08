const { Link, Route } = ReactRouterDOM;

import { ReviewList } from '../cmps/ReviewList.jsx';
import { Loader } from "../../../cmps/Loader.jsx";
import { ReviewAdd } from "../cmps/ReviewAdd.jsx";
import { bookService } from "../services/book.service.js";

export class BookDetails extends React.Component {
  state = {
    readMore: false,
    isReadMore: false,
    book: null,
  };

  componentDidMount() {
    this.loadBook();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
  }

  loadBook = () => {
    const { bookId } = this.props.match.params;
    bookService.getBookById(bookId).then((book) => {
      if (!book) return this.props.history.push("/book");
      if (book.description.length > 100) this.setState({ book, readMore: true })
      else this.setState({ book, readMore: false });
    });
  };

  onCloseModal = () => {
    this.props.history.push("/book");
  };

  toggleReadMore = () => {
    this.setState({ isReadMore: !this.state.isReadMore });
  };

  getPageCount = () => {
    const amount = this.state.book.pageCount;
    if (amount <= 100) return "Light reading";
    if (amount <= 200) return "Decent reading";
    return "Long reading";
  };

  getHowOld = () => {
    const { book } = this.state;
    const year = new Date(Date.now()).getFullYear();
    const bookRealeseYear = book.publishedDate;
    if (year - bookRealeseYear <= 1) return "New publish!";
    if (year - bookRealeseYear >= 10) return "Vetren Book";
  };

  getBookCategories = () => {
    return this.state.book.categories.join(", ");
  };

  getCurrencySymbole = () => {
    let symbol = "";
    switch (this.state.book.listPrice.currencyCode) {
      case "EUR":
        symbol = "€";
        break;
      case "ILS":
        symbol = "₪";
        break;
      case "USD":
        symbol = "$";
        break;
    }
    return symbol;
  };

  markPrice = () => {
    const bookPrice = this.state.book.listPrice.amount;
    if (bookPrice > 150) return "over-priced";
    if (bookPrice < 20) return "cheap";
  };

  onReviewAdded = (book) => {
    this.setState({ book })
  }

  onRemoveReview = (review) => {
    console.log('review.id', review);
    bookService.removeReview(this.state.book, review)
      .then(this.loadBook())
  };

  getTxt = () => {
    let { description } = this.state.book
    if (!description) return
    let txt = description
    if (this.state.readMore) {
      txt = this.state.isReadMore ? description : description.substring(0, 100) + "...";
    }
    return txt
  }

  render() {
    const { book } = this.state;
    if (!book) return <Loader />;
    const { reviews } = book;
    return (
      <article className='book-container'>
        
        <div className="book-details">
        <button className="back-libary-btn" onClick={this.onCloseModal}><i className="fas fa-arrow-left"></i></button>
          <img className='img-details' src={book.thumbnail} alt='' />
          <Route component={ReviewAdd} path='/book/read/:bookId/add-review' />
          <div>
            <div className="review-section">
              <Link to={`/book/read/${book.id}/add-review`}>Add review</Link>
            </div>
            <div className="review-display">
              <h2>Reviews</h2>
              {(!reviews) ? (
                <h4>No reviews yet</h4>
              ) : (
                <div className='show-reviews'>
                  <div>Name</div>
                  <div>Rate</div>
                  <div>Date</div>
                  <div>Review</div>
                  <div>Delete review</div>
                  <ReviewList reviews={reviews} removeReview={this.onRemoveReview} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='book-desc'>
          <div className="book-titles">
            <h2>{book.title}</h2>
            <small>{book.subtitle}</small>
            <h3 className='authors-names'>
              {book.authors.map((author) => (
                <span key={author}>{author}</span>
              ))}
            </h3>
          </div>
          <div className="book-about">
            <label htmlFor='bookDesc'>About this book:</label>
            <p>{this.getTxt()} {this.state.readMore && <button onClick={this.toggleReadMore}>{this.state.isReadMore ? 'Read less' : 'Read more'}</button>}</p>
            <div className='book-categories'>
              <div className='page-count'>{this.getPageCount()}</div>
              <div className='boo-age'>{this.getHowOld()}</div>
              <small>categories: {this.getBookCategories()}</small>
              {book.listPrice.isOnSale && (
                <p className='sale'>This book is on sale</p>
              )}
              <p className={this.markPrice()}>
                {book.listPrice.amount} {this.getCurrencySymbole()}
              </p>
            </div>
          </div>
          <div className="nav-btns">
            <Link className='btn-next decoration-none' to={`/book/read/${bookService.getPrevBookId(book.id)}`}><i className="fas fa-step-backward" title='previews book'></i></Link>
            <Link className='btn-preview decoration-none' to={`/book/read/${bookService.getNextBookId(book.id)}`}><i className="fas fa-step-forward" title='next book'></i></Link>
          </div>
        </div>

      </article>
    );
  }
}


window.BookDetails = BookDetails