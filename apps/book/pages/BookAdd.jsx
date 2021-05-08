const { withRouter } = ReactRouterDOM

import { utilService } from '../../../services/util-service.js'
import { ResultList } from "../cmps/ResultList.jsx";
import { addBookService } from "../services/add.book.service.js";
import { bookService } from '../services/book.service.js'

class _BookAdd extends React.Component {
  state = {
    search: {
      searchInput: "",
      results: null,
    },
  };

  inputRef = React.createRef();
  componentDidMount() {
    this.inputRef.current.focus();
  }
  handleChange = (ev) => {
    const field = ev.target.name;
    const value =
      ev.target.type === "number" ? +ev.target.value : ev.target.value;
    this.setState(({ search }) => ({
      search: { ...search, [field]: value },
    }));
  };

  onSubmitForm = (ev) => {
    ev.preventDefault()
    const { searchInput } = this.state.search;
    addBookService.query(searchInput)
      .then(res => {
        console.log(res);
        this.setState(prevState => ({
          search: {
            ...prevState.search,
            results: res.items
          }
        }))
      })
  };

  onAddBook = (bookId) => {
    const { saveGoogleBook } = bookService
    const currency = ['USD', 'EUR', 'ILS']
    const currencyCode = utilService.getRandomIntInclusive(0, 2)
    const { results } = this.state.search
    const googleBook = results.find(result => result.id === bookId)
    const bookToSave = {
      "id": googleBook.id,
      "title": googleBook.volumeInfo.title,
      "subtitle": googleBook.volumeInfo.subtitle,
      "authors": googleBook.volumeInfo.authors,
      "publishedDate": new Date(googleBook.volumeInfo.publishedDate).getFullYear(),
      "description": googleBook.volumeInfo.description,
      "pageCount": googleBook.volumeInfo.pageCount,
      "categories": googleBook.volumeInfo.categories,
      "thumbnail": googleBook.volumeInfo.imageLinks.thumbnail,
      "language": googleBook.volumeInfo.language,
      "listPrice": {
        "amount": utilService.getRandomIntInclusive(10, 300),
        "currencyCode": currency[currencyCode],
        "isOnSale": Math.random() > 0.5 ? true : false
      }
    }
    saveGoogleBook(bookToSave)
      .then(this.props.history.push('/book'))
  }

  render() {
    const { results } = this.state.search
    return (
      <section className='book-add'>
        <h1>Add book</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            type='text'
            name='searchInput'
            placeholder='type to search'
            ref={this.inputRef}
            value={this.state.searchInput}
            onChange={this.handleChange}
          />
          <button type='submit'>Search</button>
        </form>
        <ul className="search-results clean-list">
          {results && <ResultList searchResults={results} onAddBook={this.onAddBook} />}
        </ul>
      </section>
    );
  }
}

export const BookAdd = withRouter(_BookAdd)
