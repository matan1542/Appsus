import { EditLine } from "./EditLine.jsx";
import {DynamicCmps} from "./DynamicCmps.jsx"
export class NotePreview extends React.Component {
  state = {
    colorProfile: null,
    mapShown: false,
    posObj: null,
  };
  componentDidMount() {
    this.setState({ colorProfile: this.props.note.color });
  }

  changeColorProfile = (color) => {
    const { note, onEditNote } = this.props;
    note.color = color;
    onEditNote(note, note.id);
    this.setState({ colorProfile: color });
  };

    render() {
    const { note, onDeleteNote, onEditNote, onPinnedNote } = this.props;
    return (
      <section>
        <div className={`note-container ${this.state.colorProfile}`}>
          <DynamicCmps note={note}/>
          <EditLine
            note={note}
            id={note.id}
            onDeleteNote={onDeleteNote}
            changeColorProfile={this.changeColorProfile}
            onPinnedNote={onPinnedNote}
            onEditNote={onEditNote}
          />
        </div>
      </section>
    );
  }
}
