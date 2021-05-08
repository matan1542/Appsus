

export function LabelPreview({ label, onClickLabels, isToAdd }) {
    return (
        <li onClick={() => onClickLabels(label)}><small className={isToAdd ? 'label-item label-to-add' : 'label-item label-to-remove'}>{label !== 'Inbox' && label !== 'Sent' && label !== 'All' && label}</small></li>
    )
}