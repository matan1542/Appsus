import {MapRender} from './note-cmps/MapRender.jsx'
import {NoteAudio} from './note-cmps/NoteAudio.jsx'
import {NoteVideo} from './note-cmps/NoteVideo.jsx'
import {NoteImg} from './note-cmps/NoteImg.jsx'
import {NoteText} from './note-cmps/NoteText.jsx'
import {NoteTodoList} from './note-cmps/NoteTodoList.jsx'


export function DynamicCmps({note}){
    switch (note.type) {
        case "NoteText":
          return <NoteText note={note}/>
        case "NoteImg":
          return <NoteImg note={note}/>
        case "NoteVideo":
          return <NoteVideo note={note}/>
        case "NoteAudio":
          return <NoteAudio note={note}/>
        case "NoteTodos":
          return <NoteTodoList note={note}/>
        case "NoteMap":
            return <MapRender note={note}/>
      }
      return null;
}