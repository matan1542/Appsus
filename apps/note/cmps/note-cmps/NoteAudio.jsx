export function NoteAudio({ note }) {
  return <div> <audio
  className="audio-container"
  controls
  src={note.info.audio}
  type="audio/mpeg"
></audio></div>;
}
