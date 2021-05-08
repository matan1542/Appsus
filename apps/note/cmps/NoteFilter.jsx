export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            freeText: '',
            type: ''
        }
    };

    handleChange = (ev) => { 
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ filterBy :{ ...this.state.filterBy,[field]:value}},()=>{this.props.setFilter(this.state.filterBy)});
    };

    render() {
        return <section className="note-filter flex">
            <input type="text" name="freeText"
                value={this.state.filterBy.freeText}
                placeholder="Search"
                autoComplete="off"
                onChange={this.handleChange} />
            <select name="type" value={this.state.filterBy.type}
                onChange={this.handleChange}>
                <option value="">All</option>
                <option value="NoteText">Text</option>
                <option value="NoteImg">Image</option>
                <option value="NoteAudio">Audio</option>
                <option value="NoteVideo">Video</option>
                <option value="NoteTodos">Todos</option>
                <option value="NoteMap">Map</option>
            </select>
        </section>;
    }
}