import { LabelPreview } from './LabelPreview.jsx'

export function LabelList({ labels, onClickLabels, isToAdd }) {
    return (
        <ul className='mail-labels-list clean-list'>
            {labels.map(label => <LabelPreview key={label} label={label} onClickLabels={onClickLabels} isToAdd={isToAdd} />)}
        </ul>
    )
}