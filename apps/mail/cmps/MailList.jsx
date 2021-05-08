const { Link } = ReactRouterDOM;

import { MailPreview } from './MailPreview.jsx';

export function MailList({ mails, onReadMail, onRemoveMail, onStarMail, sortMail, sortedBy }) {
  return (
    <section className='mail-list'>
      <table>
        <thead>
          <tr className='table-header'>
            <td className='from'>From</td>
            <td className='subject'>Subject</td>
            <td className='body'>Message</td>
            <td className='time' onClick={sortMail}>Time {sortedBy > 0 ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>}</td>
            <td className="actions"></td>
          </tr>
        </thead>
        <tbody>
          { mails.map((mail) => {
            return (
              <MailPreview key={mail.id} mail={mail} onReadMail={onReadMail} onRemoveMail={onRemoveMail} onStarMail={onStarMail} />
            );
          })}
        </tbody>
      </table>
      {(mails.length === 0) && <div className="no-mails"> <h2>No mails to show</h2></div>}
    </section>
  );
}
