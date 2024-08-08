import './overlay.css'

export default function Overlay() {
    return new Array(16).fill().map((_, i) => <div key={i} className="overlay"/>)
}