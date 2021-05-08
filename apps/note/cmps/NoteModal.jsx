const { withRouter } = ReactRouterDOM;
import { NoteControlType } from "./NoteControlType.jsx";

class _NoteModal extends React.Component {
  state = {
    note: {
      type: "NoteText",
      txt: null,
      img: null,
      video: null,
      list: null,
      createdAt: Date.now(),
    },
    noteState: null,
    fadeOut: false,
  };

  closeModal = () => {
    this.props.history.push(`/note`);
    this.handleStateChange();
    if (this.props.editColor) this.props.editColor();
  };
  onOutSideClick = (ev) => {
    if (ev.target.classList.contains("modal-container")) {
      this.props.history.push(`/note`);
      this.handleStateChange();
      // node.classList.add("animate__animated animate__fadeOut")
      if (this.props.editColor) this.props.editColor();
    }
  };
  handleStateChange = () => {
    if (this.state.noteState === "Add") {
      this.props.onAddNote(this.state.note);
    } else {
      this.props.onEditNote(this.state.note, this.props.match.params.id);
    }
  };
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "radio" ? +target.value : target.value;
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        [field]: value,
      },
    }));
  };


  componentDidMount() {
    this.myRef = React.createRef();
    if (this.props.match.params.id) {
      this.setState({ noteState: "Edit" });
    } else {
      this.setState({ noteState: "Add" });
    }
  }

  setNoteState = (id) => {
    let str = "";
    let className = "";
    if (id) {
      str = "Edit Note";
      className = "transparent";
    } else {
      str = "Add Note";
    }
    const noteState = {
      str,
      className,
    };
    return noteState;
  };
  inputState = (name) => {
    switch (this.state.note.type) {
      case "NoteText":
        if (name) return "txt";
        return "Enter some text";
      case "NoteImg":
        if (name) return "img";
        return "Enter Image URL";
      case "NoteVideo":
        if (name) return "video";
        return "Enter Video URL";
      case "NoteAudio":
        if (name) return "audio";
        return "Enter Audio URL";
      case "NoteTodos":
        if (name) return "list";
        return "Enter comma separated list";
      case "NoteMap":
        if (name) return "map";
        return "Enter city name";
    }
  };

  onSetInputType = (type) => {
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        type,
      },
    }));
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <div
        onClick={this.onOutSideClick}
        ref={this.myRef}
        className={`modal-container ${this.setNoteState(id).className} `}
      >
        <div className="modal note-modal animate__animated animate__fadeIn__faster">
          <span onClick={this.closeModal} className="close-modal">
            x
          </span>
          <h1>{this.setNoteState(id).str}</h1>
          <div className="note-create-container">
            <input
              type="text"
              name={this.inputState("name")} //just some way to make the inputstate function be dynamic
              onChange={this.handleChange}
              className="note-input"
              placeholder={this.inputState()}
            />
            <NoteControlType onSetInputType={this.onSetInputType} />
          </div>
        </div>
      </div>
    );
  }
}

export const NoteModal = withRouter(_NoteModal);
