const { Link } = ReactRouterDOM

import { bookService } from './services/book.service.js';
import { BookList } from './cmps/BookList.jsx';
import { BookFilter } from './cmps/BookFilter.jsx';
import { Loader } from '../../cmps/Loader.jsx';

export class BookApp extends React.Component {
    state = {
        books: null,
        filterBy: null,
    };
    componentDidMount() {
        this.loadBooks();
    }

    loadBooks() {
        bookService.query(this.state.filterBy).then((books) => {
            this.setState({ books });
        });
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks);
    };

    render() {
        const { books } = this.state;
        if (!books) return <Loader />
        return (
            <section className='book-app '>

                <BookFilter onSetFilter={this.onSetFilter} />
                <BookList books={books} />
                <Link className='compose-btn' to='/book/add-book'>
                    <i className="fas fa-plus"></i>
                </Link>

            </section>
        );
    }
}
