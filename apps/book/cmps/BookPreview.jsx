const { Link } = ReactRouterDOM;

export class BookPreview extends React.Component {
  state = {
    showText: false,
  };
  handleTextShow = (boolean) => {
    this.setState({ showText: boolean });
  };
  get changeIsLongTxtShown() {
    let descStr = this.props.book.description;
    let TEXT_COUNT = (descStr.length > 100)? 100 : descStr.length /2;    
    descStr =  descStr.substring(0, TEXT_COUNT );
    descStr += " read more...";
    return descStr;
  };
  render() {
    const {book} = this.props;
    return (
      <Link className="decoration-none" to={`/book/read/${book.id}`}>
            <div
        onMouseLeave={() => {
          this.handleTextShow(false);
        }}
        onMouseEnter={() => {
          this.handleTextShow(true);
        }}
        className="book-card"
      >
        <div className="card-img">
          <img  src={this.props.book.thumbnail} />
        </div>
        {this.state.showText && (
          <p className="card-description animate__animated animate__fadeInDown">
            {this.changeIsLongTxtShown}
          </p>
        )}
        {!this.state.showText && (
          <h4 className="card-title">{this.props.book.title}</h4>
        )}
      </div>
      </Link>
    );
  }
 
}
