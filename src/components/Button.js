export default function Button({btnClass, title, onClick}) {
    return (
        <button onClick={onClick} className={`btn ${btnClass}`}>{title}</button>
    )
}