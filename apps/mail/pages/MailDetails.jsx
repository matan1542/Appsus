
const { withRouter, Route, Link } = ReactRouterDOM

import { MailCompose } from '../cmps/MailCompose.jsx'
import { Loader } from "../../../cmps/Loader.jsx";
import { mailService } from "../services/mail.service.js";
import { LabelList } from '../cmps/LabelList.jsx'

class _MailDetails extends React.Component {
  state = {
    mail: null,
  };
  componentDidMount() {
    this.loadMail();
  }
  loadMail = () => {
    const { mailId } = this.props.match.params;
    mailService.getMailById(mailId).then((mail) => {
      mail.isRead = true
      this.setState({ mail })

    });
  };

  onRemoveMail = () => {
    const { mailId } = this.props.match.params;
    console.log('before history push');
    mailService.remove(mailId).then(() => {
      this.props.history.push('/mail');
    })
  };

  getLabels = () => {
    const labels = mailService.getAvailableLabels()
    const avialableLabels = labels.filter(label => {
      return !this.state.mail.labels.includes(label)
    })
    return avialableLabels
  }

  onRemoveLabels = (label) => {
    const { mailId } = this.props.match.params;
    mailService.removeLabel(mailId, label)
      .then(mail => this.setState({ mail }))
  }

  onAddLabel = (label) => {
    mailService.addNewMailLabel(this.state.mail.id, label)
      .then(mail => this.setState({ mail }))
  }

  onCloseMail = () => {
    this.props.history.push('/mail')
  }

  onComposeMail = (mail) => {
    mailService.sendMail(mail)
  }



  render() {
    if (!this.state.mail) return <Loader />
    const { from, subject, body, labels, id } = this.state.mail;
    return (
      <section className='mail-details'>
        <i className="fas fa-arrow-left btn back-btn" onClick={this.onCloseMail} title='back to mailbox'></i>
        <div className='mail'>
          <h3 className='from'>From: </h3>
          <p>{from}</p>
          {this.state.mail.to && <h3 className='to'>To: </h3>}
          {this.state.mail.to && <p>{this.state.mail.to}</p>}
          <h4 className='subject'>Subject: </h4>
          <p>{subject}</p>
          <h4 className='body'>Body:</h4>
          <p> {body}</p>
          <div className="labels">
            <div className="user-labels">
              <small>Mail label</small>
              <LabelList labels={labels} isToAdd={false} onClickLabels={this.onRemoveLabels} />
            </div>
            <div className="available-labels">
              <small>Add label to mail</small>
              <LabelList labels={this.getLabels()} isToAdd={true} onClickLabels={this.onAddLabel} />
            </div>
          </div>
        </div>
        <div className='edit-mail flex'>
          <Route exact component={() => <MailCompose mail={this.state.mail} onComposeMail={this.onComposeMail} />} exact path={`/mail/read/:mailId/replay-mail`} />
          <Link className='replay-btn decoration-none' to={`/mail/read/${id}/replay-mail`}>
            <i className="fas fa-reply" title='replay mail'></i>
          </Link>
          <i className="fas fa-dumpster btn delete-btn right-self" onClick={this.onRemoveMail} title='remove mail'></i>
        </div>
      </section>
    );
  }
}


export const MailDetails = withRouter(_MailDetails)