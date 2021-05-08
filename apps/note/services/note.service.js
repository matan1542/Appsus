import { storageService } from "../../../services/storage/storage-service.js"
import { utilService } from "../../../services/util-service.js"

import { notes } from "./storage/notes.js"
export const noteService = { query, onAddNote, removeNote, editNote, pinNote, mapTypeAmount }
const KEY = 'notes';
const KEYPINNED = 'pinned';

var gNotes = storageService.loadFromStorage(KEY) || _loadNotesToStorage();
var gPinnedNotes = storageService.loadFromStorage(KEYPINNED) || [];


function query(filterBy) {
    let notes = {
        gNotes,
        gPinnedNotes
    }
    if (!filterBy || !filterBy.type && !filterBy.freeText) return Promise.resolve(notes);
    if(filterBy.type){
        notes.gNotes = notes.gNotes.filter((note) => note.type === filterBy.type);
        notes.gPinnedNotes = notes.gPinnedNotes.filter((note) => note.type === filterBy.type);
    }
    if ((filterBy.freeText && filterBy.type ==='NoteText') || (filterBy.freeText && !filterBy.type)) {
        notes.gNotes = notes.gNotes.filter((note) => {
            if(!note.info.txt) return;
            const newNote = (note.info.txt).toLowerCase();
            const txt = (filterBy.freeText).toLowerCase();
            return newNote.includes(txt);
        });
        notes.gPinnedNotes = notes.gPinnedNotes.filter((note) => {
            if(!note.info.txt) return;
            const newNote = (note.info.txt).toLowerCase();
            const txt = (filterBy.freeText).toLowerCase();
            return newNote.includes(txt);
        });
    }
    return Promise.resolve(notes)
}

function removeNote(id) {
    let idx = gNotes.findIndex(note => note.id === id)
    if (idx === -1) {
        idx = gPinnedNotes.findIndex(note => note.id === id)
        gPinnedNotes.splice(idx, 1);
    } else {
        gNotes.splice(idx, 1);
    }
    _saveNotesToStorage();
    return Promise.resolve();
}
function onAddNote(note) {
    const newNote = {
        id: utilService.makeId(),
        type: note.type,
        color: null,
        isPinned: false,
        info: {
            txt: note.txt,
            img: note.img,
            video: note.video,
            audio: note.audio,
            list: note.list,
            map: note.map
        }
    }
    gNotes.unshift(newNote);
    _saveNotesToStorage();
    return Promise.resolve();
}

function mapTypeAmount() {
    const notes = gNotes.filter(note => note.type === 'NoteMap');

    return notes.length + 1;
}



function getNoteById(noteId) {
    var note = gNotes.find(note => noteId === note.id)
    if (!note) {
        note = gPinnedNotes.find(note => noteId === note.id)
    }
    return Promise.resolve(note)
}

function editNote(newNote, noteId) {
    return getNoteById(noteId)
        .then((note) => {
            note.info.txt = (newNote.txt) ? newNote.txt : note.info.txt;
            note.type = (newNote.type) ? newNote.type : newNote.type;
            note.info.img = (newNote.img) ? newNote.img : note.info.img;
            note.info.video = (newNote.video) ? newNote.video : note.info.video;
            note.info.audio = (newNote.audio) ? newNote.audio : note.info.audio;
            note.info.list = (newNote.list) ? newNote.list : note.info.list;
            note.color = newNote.color;
            _saveNotesToStorage();
            return Promise.resolve();
        })
        .catch((err) => {
            console.log(err);
        })
}
function pinLocation(newNote) {
    const pinNotes = gNotes.filter(note => note.isPinned)
    const unPinnedNotes = gNotes.filter(note => !note.isPinned)
    pinNotes.unshift(newNote);
    gPinnedNotes = pinNotes;
    gNotes = unPinnedNotes;
    // console.log(gNotes)
    _saveNotesToStorage();
}
function pinNote(noteId) {
    const idxNotes = gNotes.findIndex(note => note.id === noteId)
    const idxPinnedNotes = gPinnedNotes.findIndex(note => note.id === noteId)
    console.log('idxNotes', idxNotes, 'idxPinnedNotes', idxPinnedNotes)
    console.log(idxPinnedNotes)
    return getNoteById(noteId)
        .then((note) => {
            note.isPinned = !note.isPinned;
            const newNote = note;
            if (note.isPinned) {
                if (idxNotes !== -1) {
                    console.log('note')
                    gNotes.splice(idxNotes, 1);
                }
                gPinnedNotes.push(newNote);

            } else {
                if (gPinnedNotes !== -1) {
                    console.log('pinnedNote')

                    gPinnedNotes.splice(idxPinnedNotes, 1);
                }
                gNotes.unshift(newNote);
            }
            _saveNotesToStorage();
            return Promise.resolve();
        })
        .catch((err) => {
            console.log(err);
        })

}


function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes);
    storageService.saveToStorage(KEYPINNED, gPinnedNotes);
    return gNotes;
}



function _loadNotesToStorage() {
   

            storageService.saveToStorage(KEY, notes);
            return notes;
   
}

