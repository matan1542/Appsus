

export function ResultPreview({ result, onAddBook }) {
  return (
    <React.Fragment>
      <li className='add-result-name'>{result.volumeInfo.title}</li>
      <li className='add-result-btn'><button onClick={() => onAddBook(result.id)}><i className="fas fa-plus-circle"></i></button></li>
    </React.Fragment>
  );
}
