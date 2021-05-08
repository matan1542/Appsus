const { Link } = ReactRouterDOM;


export function MailPreview({ mail, onReadMail, onRemoveMail, onStarMail }) {
  const { subject, body, sentAt, isRead, from, id, labels } = mail;
  const aDay = 86400000
  const getTime = () => {
    const date = new Date(sentAt)
    if (new Date(Date.now()) - date < aDay) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    // return date.toLocaleDateString()
  };

  const getBody = () => {
    const txt = body.length > 40 ? body.substring(0, 40) + '...' : body;
    return txt;
  };

  return (
    <tr className='mail-preview'>
      <td><Link className={`decoration-none from-td`} to={`/mail/read/${id}`}>{from.split('@', 1)}</Link></td>
      <td><Link className={`decoration-none subject-td`} to={`/mail/read/${id}`}>{subject}</Link></td>
      <td><Link className={`decoration-none body-td`} to={`/mail/read/${id}`}>{getBody()}</Link></td>
      <td><Link className={`decoration-none time-td`} to={`/mail/read/${id}`}>{getTime()}</Link></td>
      <td className='actions-btns flex'>
        <i className="btn btn-remove fas fa-trash-alt" onClick={() => onRemoveMail(id)}></i>
        {!isRead ? <i className="btn btn-toggle-read fas fa-envelope" onClick={() => onReadMail(id)}></i> : <i className="fas fa-envelope-open" onClick={() => onReadMail(id)}></i>}
        {labels.includes('Starred') ? <i className="fas fa-star" onClick={() => onStarMail(id)}></i> : <i className="far fa-star" onClick={() => onStarMail(id)}></i>}
      </td>
    </tr>

  );
}
