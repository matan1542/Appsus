const { withRouter } = ReactRouterDOM

import { bookService } from "../services/book.service.js";
import { Loader } from "../../../cmps/Loader.jsx";

class _ReviewAdd extends React.Component {
  state = {
    review: {
      fullName: "",
      rate: 5,
      date: "",
      userReview: "",
    },
  };
  inputName = React.createRef();
  componentDidMount() {
    this.inputName.current.focus();
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "select-one" ? +target.value : target.value;
    this.setState(prevState => ({
      review: {
        ...prevState.review,
        [field]: value,
      },
    }));
  };

  closeModal = () => {
    const bookId = this.props.match.params.bookId;
    this.props.history.push(`/book/read/${bookId}`)
  }

  onSubmitForm = (ev) => {
    ev.preventDefault();
    const { review } = this.state
    const bookId = this.props.match.params.bookId;
    bookService.saveReview(bookId, review)
      .then(this.closeModal)
  };

  render() {
    if (!this.state.review) return <Loader />
    const { fullName, rate, date, review } = this.state.review;
    return (
      <React.Fragment>
        <div className="add-screen" onClick={this.closeModal}></div>
        <section className='book-review'>
          <h3>Add your own review for this book</h3>
          <form className='review-form' onSubmit={this.onSubmitForm}>
            <label htmlFor='fullName'>Your name</label>
            <input
              type='text'
              name='fullName'
              ref={this.inputName}
              value={fullName}
              onChange={this.handleChange}
              requierd='true'
            />
            <label htmlFor='rate'>Rate it</label>
            <select
              name='rate'
              id='rate'
              value={rate}
              onChange={this.handleChange}
            >
              <option value='5'>5 - highest</option>
              <option value='4'>4</option>
              <option value='3'>3</option>
              <option value='2'>2</option>
              <option value='1'>1 - lowest</option>
            </select>
            <label htmlFor='date'>Finished read at</label>
            <input
              type='date'
              id='date'
              value={date}
              onChange={this.handleChange}
              requierd='true'
              name='date'
            />
            <label htmlFor='review'>Your thoughts?</label>
            <textarea
              name='userReview'
              id='review'
              cols='30'
              rows='10'
              value={review}
              onChange={this.handleChange}
            ></textarea>
            <button className='submit-btn' type='submit'>Submit</button>
          </form>
        </section>
      </React.Fragment>
    );
  }
}

export const ReviewAdd = withRouter(_ReviewAdd)