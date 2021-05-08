import { NotePreview } from "./NotePreview.jsx";
export class NoteList extends React.Component {
  state = {};

  render() {
    const {
      notes,
      onDeleteNote,
      onEditNote,
      onPinnedNote,
      setMap,
    } = this.props;
    if (!notes.length) return <h4>Nothing to show here</h4>;
    return (
      <section className="notes-container ">
          {(!notes.length) && <div className="inline"></div>}
        <ul className="note-list clean-list">
          {notes.map((note, idx) => {           
           return  <li className="note" key={idx}>
                <NotePreview
                  key={note.id}
                  note={note}
                  setMap={setMap}
                  onDeleteNote={onDeleteNote}
                  onPinnedNote={onPinnedNote}
                  onEditNote={onEditNote}
                />
              </li>
          })}
        </ul>
      </section>
    );
  }
}
