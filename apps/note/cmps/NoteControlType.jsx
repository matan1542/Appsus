


export class NoteControlType extends React.Component {


    setInputType = (ev) =>{
        this.props.onSetInputType(ev.currentTarget.value)
    }

    render() {
        return(
            <div className="note-type">
                <button className="btn-input-type" value ="NoteText" onClick={this.setInputType}><i className="fas fa-font"></i></button>
                <button className="btn-input-type" value ="NoteImg" onClick={this.setInputType}><i className="far fa-image"></i></button>
                <button className="btn-input-type" value ="NoteVideo" onClick={this.setInputType}><i className="fab fa-youtube"></i></button>
                <button className="btn-input-type" value ="NoteAudio" onClick={this.setInputType}><i className="far fa-file-audio"></i></button>
                <button className="btn-input-type" value ="NoteTodos" onClick={this.setInputType}><i className="fas fa-list-ul"></i></button>
                <button className="btn-input-type" value ="NoteMap" onClick={this.setInputType}><i className="fas fa-map"></i></button>
                
            </div>
        )
    }
}