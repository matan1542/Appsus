const { withRouter } = ReactRouterDOM

class _MailCompose extends React.Component {

  state = {
    composeMail: {
      from: '',
      subject: '',
      body: ''
    }
  }
  componentDidMount() {
    if (this.props.mail) {
      let { body, subject, from } = this.props.mail
      subject = `re:from:${from}: ` + subject
      body = '\n \n \n ==================' + body
      this.setState(prevState => ({
        composeMail: {
          ...prevState,
          from,
          subject,
          body
        }
      }))
    }
  }

  onSubmit = (ev) => {
    ev.preventDefault()
    this.props.onComposeMail(this.state.composeMail)
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(({ composeMail }) => ({
      composeMail: { ...composeMail, [field]: value },
    }));
  };

  onCloseModal = () => {
    this.props.history.push('/mail')
  }


  render() {
    const { from, subject, body } = this.state.composeMail
    return (
      <React.Fragment>
        <div className="compose-screen">
          <form className='compose-mail animate__animated animate__fadeInUp' onSubmit={this.onSubmit}>
            <div className="compose-header"><h5>{this.props.mail ? `Replay ${this.props.mail.from}` : 'New mail'}</h5> <button className="close-mail" onClick={this.onCloseModal}><i className="fas fa-times"></i></button></div>
            <input type="email" name="from" id="compose-to" value={from} onChange={this.handleChange} placeholder="To" />
            <input
              value={subject}
              name='subject'
              id='compose-subject'
              className='compose-subject'
              onChange={this.handleChange}
              placeholder="Subject"
            ></input>
            <textarea
              value={body}
              name='body'
              id='compose-body'
              className='compose-body'
              onChange={this.handleChange}
            ></textarea>
            <div className="edit-line flex">
              <button className="send-mail-btn" type='submit'>Send</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}


export const MailCompose = withRouter(_MailCompose)

