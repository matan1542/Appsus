export class BookFilter extends React.Component {
  state = {
    filterBy: {
      title: '',
      minPrice: '',
      maxPrice: '',
    },
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value =
      ev.target.type === 'number' ? +ev.target.value : ev.target.value;
    this.setState(
      { filterBy: { ...this.state.filterBy, [field]: value } },
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };

  onFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy);
  };

  render() {
    const { title, minPrice, maxPrice } = this.state.filterBy;
    return (
      <div className='form-container'>
        <form className='book-filter' onSubmit={this.onFilter}>
          Filter <label htmlFor='byTitle'>By title</label>
          <input
            type='text'
            id='byTitle'
            name='title'
            value={title}
            onChange={this.handleChange}
          />

          <label htmlFor='minPrice'>Min price</label>
          <input
            type='number'
            id='minPrice'
            name='minPrice'
            value={minPrice}
            onChange={this.handleChange}
          />

          <label htmlFor='maxPrice'>Max price</label>
          <input
            type='number'
            id='maxPrice'
            name='maxPrice'
            value={maxPrice}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
