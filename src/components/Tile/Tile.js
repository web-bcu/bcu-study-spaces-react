import './tile.css';

export default function Tile({number}) {
    return (
        <div className={`number ${number.value === number.index + 1 ? 'correct' : ''} ${number.value === 16 ? 'disabled' : ""} slot--${number.index}`}>
            {number.value === 16 ? '' : number.value}
        </div>
    )
}