import React, { useEffect, useState } from 'react'

export default function Test() {
    const [counter, setCounter] = useState(0);

    const increase = () => {

        setCounter(prev => prev + 1)
        setCounter(prev => prev + 1)

    }
    useEffect(() => {

        console.log("new counter :", counter)
    }, [counter])
    return (
        <div>
            <button className='p-5 rounded-lg bg-green-500 ' onClick={increase}>
                click
            </button>
            <h1>value : {counter}</h1>

        </div>
    )
}
