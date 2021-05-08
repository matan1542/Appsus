export function NoteImg({ note}) {
    return (
      <div>
        <img src={note.info.img} alt="" />
      </div>
    );
  }