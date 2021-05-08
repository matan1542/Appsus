
const { Route,Link,withRouter } = ReactRouterDOM;
import {ColorLine} from './ColorLine.jsx';
import {NoteModal} from './NoteModal.jsx'; 
 class _EditLine extends React.Component {
    state = {
        ColorLineContainer: null,
        isPinned: false,
        isPalette: false,
        isEdit:false
    }
    componentDidMount() {
        this.setState({isPinned:this.props.note.isPinned})
    }

    changeColorLine = ()=>{
        this.setState({ColorLineContainer: !this.state.ColorLineContainer,isPalette:!this.state.isPalette})
    }
    pinnedColor = ()=>{
        this.setState({isPinned:!this.state.isPinned})
    }
    paletteColor = ()=>{
        console.log(this.state.isPalette)
        this.setState({isPalette:!this.state.isPalette});
    }
    editColor = ()=>{
        this.setState({isEdit:!this.state.isEdit});

    }
    render(){
        const {onPinnedNote,onDeleteNote,onEditNote,changeColorProfile,id} = this.props;
        
        return(
            <section>
                <div className="edit-line-container">
                    <button className={`note-btn `} onClick={()=>{
                        onPinnedNote(id)
                    }    
                    }><i className={`fas fa-thumbtack ${(this.state.isPinned) && 'note-toggle-btn'}`} onClick={()=>{this.pinnedColor()}}></i></button>
                    <button className={`note-btn`} onClick={()=>{
                        this.paletteColor()                      
                           this.changeColorLine();
                    }}><i className={`fas fa-palette ${(this.state.isPalette) && 'note-toggle-btn'}`}></i></button>
                    <Route component={()=><NoteModal editColor={this.editColor} onEditNote={onEditNote}/>} path="/note/edit/:id" />
                    <Link className="note-btn" to={`/note/edit/${id}`} onClick={this.editColor} ><i className={`fas fa-edit ${(this.state.isEdit) && 'note-toggle-btn'}`}></i></Link>
                    <button onClick={() =>{
                        onDeleteNote(id)
                        
                    }} className="note-btn"><i className="fas fa-trash-alt"></i></button>
                </div>
                {(this.state.ColorLineContainer) && <ColorLine changeColorLine={this.changeColorLine} changeColorProfile={changeColorProfile}/>}
            </section>
        )
    }
}

export const EditLine = withRouter(_EditLine)