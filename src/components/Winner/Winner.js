import NewGame from '../NewGame';
import './winner.css';
import React from 'react'

export default function Winner({numbers, reset}) {
    if (!numbers.every(n => n.value === n.index + 1))
        return null

    return (
        <div className='winner'>
            <p className='font-pacifio font-bold text-white text-6xl'>You won!</p>
            <NewGame reset={reset}/>
        </div>
    )
}