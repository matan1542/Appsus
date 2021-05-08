import { eventBusService } from '../../../services/event.bus.service.js';

export class SideNavPreview extends React.Component {
    state = {
        unreadMailCount: 0
    }
    removeEvent;
    componentDidMount() {
        this.removeEvent = eventBusService.on(
            'mail-count',
            (unreadMailCount) => {
                this.setState({ unreadMailCount });
            }
        );
    }
    componentWillUnmount() {
        this.removeEvent()
    }

    onLabelClick = (label) => {
        this.props.onLabelSelect(label)
        this.props.setActiveLabel(label)
    }
    setIcon = (label) => {
        if (label.includes('Star')) {
            return <i className="far fa-star"></i>;
        } else if (label.includes('Inbox')) {
            return <i className="fas fa-inbox"></i>;
        } else if (label.includes('Sent')) {
            return <i className="far fa-paper-plane"></i>;
        } else {
            return <i className="far fa-envelope"></i>
        }
    }


    render() {
        const { label, activeLabel } = this.props
        const { unreadMailCount } = this.state
        return (
            <li onClick={() => this.onLabelClick(label)} className={` labels ${label} ${activeLabel === label && 'active'}`}>{this.setIcon(label)}{label} {label === 'Inbox' && unreadMailCount > 0 && `(${unreadMailCount})`}</li>
        )
    }
}