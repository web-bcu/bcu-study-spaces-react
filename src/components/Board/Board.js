import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './board.css';
import NewGame from "../NewGame";
import Overlay from "../Overlay/Overlay";
import Winner from "../Winner/Winner";
import Button from "../Button";
import Tile from "../Tile/Tile";

export default function Board() {
    const shuffle = () => new Array(16)
        .fill()
        .map((_, i) => i + 1)
        .sort(() => Math.random() - 0.5)
        .map((x, i) => ({ value: x, index: i }))

    const [numbers, setNumbers] = useState([])
    const [animating, setAnimating] = useState(false);
    const navigate = useNavigate();

    const moveTile = tile => {
        const i16 = numbers.find(n => n.value === 16).index
        const valid = [i16 - 1, i16 + 1, i16 - 4, i16 + 4]
        if (!valid.includes(tile.index) || animating)
            return

        const newNumbers = [...numbers].map(number => {
            if (number.index !== i16 && number.index !== tile.index)
                return number
            else if (number.value === 16)
                return { value: 16, index: tile.index }

            return { value: tile.value, index: i16 }
        })
        setAnimating(true)
        setNumbers(newNumbers)
        setTimeout(() => setAnimating(false, 400))
    }

    const handleKeyDown = e => {
        const i16 = numbers.find(n => n.value === 16).index
        if (e.keyCode === 37 && !(i16 % 4 === 3))
            moveTile(numbers.find(n => n.index === i16 + 1))
        else if (e.keyCode === 38 && !(i16 > 11))
            moveTile(numbers.find(n => n.index === i16 + 4))
        else if (e.keyCode === 39 && !(i16 % 4 === 0))
            moveTile(numbers.find(n => n.index === i16 - 1))
        else if (e.keyCode === 40 && !(i16 < 4))
            moveTile(numbers.find(n => n.index === i16 - 4))
    }

    const reset = () => setNumbers(shuffle())

    useEffect(reset, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => { document.removeEventListener('keydown', handleKeyDown) }
    })

    function goBack() {
        navigate(-1);
    }

    return (
        <div>
            <div className='absolute top-4 left-4'>
                <Button title="Go Back" btnClass="btn-primary text-white" onClick={goBack} />
            </div>
            <div className="game relative">
                <div className="board">
                    <Overlay />
                    {numbers.map((x, i) =>
                        // <div key={i}>{x.value}</div>
                        <Tile key={i} number={x} />
                    )}
                </div>
                <Winner numbers={numbers} reset={reset} />
                <NewGame reset={reset} />
            </div>
        </div>
    )
}