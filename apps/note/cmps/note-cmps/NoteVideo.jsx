export function NoteVideo({ note}) {

    const embedYoutubeVideo = (video) => {
        let str = "https://www.youtube.com/embed/" + video.split("=")[1];
        return (
          <iframe width="100%" src={str} frameBorder="0" allowFullScreen></iframe>
        );
      };
    return (
      <div>
        {embedYoutubeVideo(note.info.video)}
      </div>
    );
  }
  