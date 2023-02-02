import React from 'react'
import { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)
    const [incrNumber, setIncrNumber] = useState('')

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    const addValue = Number(incrNumber) || 0
    const subValue = Number(incrNumber) || 0

    const incrementByAmout = (incrAmount) => {
        setCount(count + incrAmount)
    }

    const decrementByAmout = (incrAmount) => {
        setCount(count - incrAmount)
    }

    const resetAll = () => {
        setCount(0)
        setIncrNumber(0)
    }

  return (
    <div>
        <h1>Awesome Counter</h1>
        <div className='counter--container'>
            <div className='addSub--counter'>
                <button className='counter--buttonSub' onClick={decrement}>-</button>
                <p className='counterSum'>{count}</p>
                <button className='counter--button' onClick={increment}>+</button>
            </div>
            <div className='counter--inter'>
                <button className='counter--sub' onClick={() => decrementByAmout(subValue)}>Sub</button>
                <input
                    type='text'
                    className='counter--input'
                    value={incrNumber}
                    onChange={(e) => setIncrNumber(e.target.value)}
                />
                <button className='counter--add' onClick={() => incrementByAmout(addValue)}>Add</button>
            </div>
            <button className='reset--counter' onClick={resetAll}>Reset</button>
        </div>
    </div>
  )
}

export default Counter