import { SideNavPreview } from './SideNavPreview.jsx'


export function SideNavList({ labels, onLabelSelect, setActiveLabel, activeLabel }) {
    return (
        <ul className="side-nav-list clean-list">
            {labels.map(label => <SideNavPreview key={label} label={label} onLabelSelect={onLabelSelect} activeLabel={activeLabel} setActiveLabel={setActiveLabel} />)}
        </ul>
    )
}