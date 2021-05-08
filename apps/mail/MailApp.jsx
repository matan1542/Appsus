const { Route, Link } = ReactRouterDOM;

import { MailList } from './cmps/MailList.jsx';
import { Loader } from '../../cmps/Loader.jsx';
import { mailService } from './services/mail.service.js';
import { MailFilter } from './cmps/MailFilter.jsx';
import { eventBusService } from '../../services/event.bus.service.js';
import { MailCompose } from './cmps/MailCompose.jsx';
import { SideNav } from './cmps/SideNav.jsx'

export class MailApp extends React.Component {
  state = {
    sortedBy: -1,
    mails: null,
    filterBy: {
      txt: '',
      mailStatus: '',
    },
    labels: null
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    mailService.query(this.state.filterBy)
      .then(userData => mailService.sortMail(userData, this.state.sortedBy))
      .then((userData) => {
        const { mails, labels } = userData
        this.setState({ mails, labels });
        const unreadMail = mails.filter((mail) => !mail.isRead);
        eventBusService.emit('mail-count', unreadMail.length);
      });
  };

  onAddLabel = (newLabel) => {
    mailService.addNewLabel(newLabel)
      .then(labels => {
        this.setState({ labels })
        this.props.history.push('/mail')
      })
  }

  onCloseModal = () => {
    this.props.history.push('/mail')
  }

  onReadMail = (mailId) => {
    mailService.toggleIsRead(mailId).then(({ mails, labels }) => {
      this.setState({ mails, labels })
      const unreadMail = mails.filter((mail) => !mail.isRead);
      eventBusService.emit('mail-count', unreadMail.length);
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy: { ...this.state.filterBy, ...filterBy } }, () => {
      this.loadUserData();
    });
  };

  onComposeMail = (composeMail) => {
    mailService.sendMail(composeMail)
      .then((mails) => {
        this.loadUserData()
        this.props.history.push('/mail')
      })
  };

  onLabelSelect = (label) => {
    mailService.getByLabel(label)
      .then(mails => this.setState({ mails }))
  }

  onRemoveMail = (mailId) => {
    mailService.remove(mailId)
      .then(mails => this.setState({ mails }))
  }

  onStarMail = (mailId) => {
    mailService.toggleMailStar(mailId)
      .then(mails => {
        this.setState({ mails })
      })
  }

  sortMail = () => {
    this.state.sortedBy *= -1
    this.loadUserData()
  }

  render() {
    const { mails, labels, sortedBy } = this.state;
    if (!mails) return <Loader />
    return (
      <section className='mail-app '>
        <MailFilter onSetFilter={this.onSetFilter} />
        <div className="mail-app-grid">
          <SideNav labels={labels} onLabelSelect={this.onLabelSelect} onAddLabel={this.onAddLabel} onCloseModal={this.onCloseModal} />
            <MailList mails={mails} onReadMail={this.onReadMail} onRemoveMail={this.onRemoveMail} onStarMail={this.onStarMail} sortMail={this.sortMail} sortedBy={sortedBy} />
          <Route exact component={() => <MailCompose onComposeMail={this.onComposeMail} />} exact path={'/mail/compose-mail'} />
          <Link className='compose-btn' to='/mail/compose-mail'>
            <i className="fas fa-plus"></i>
          </Link>
        </div>
      </section>
    );
  }
}
