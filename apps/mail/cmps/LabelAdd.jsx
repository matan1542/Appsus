
export class LabelAdd extends React.Component {
    state = {
        labelInput: ''
    }

    handleChange = ({ target }) => {
        const labelInput = target.value;
        this.setState({ labelInput });
    };

    onSubmit = (ev) => {
        ev.preventDefault()
        this.props.onAddLabel(this.state.labelInput)
    }

    render() {
        const { labelInput } = this.state
        return (
            <React.Fragment>
                <div onClick={this.props.onCloseModal} className="compose-screen"></div>
                <div className="add-label">
                    <h3>Enter new label</h3>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" name="labelInput" value={labelInput} onChange={this.handleChange} placeholder='type your new label name' />
                        <button type='submit'>Submit</button>
                    </form>
                    <button onClick={this.props.onCloseModal}>Discard</button>
                </div>
            </React.Fragment>
        )
    }
}