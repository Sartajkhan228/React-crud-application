import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset } from '../../features/counterSlice'

const Counter = () => {

    const data = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(increment(data))
    }

    const handleDecrement = () => {
        dispatch(decrement(data))
    }

    const handleReset = () => {
        dispatch(reset(data))
    }

    return (

        <div className='border-2 px-7 py-5 w-2xs border-amber-100 m-7 rounded-2xl'>
            <h1>Counter: {data}</h1>
            <button onClick={handleIncrement} className='px-2.5 py-2 m-1.5 bg-black text-white rounded-2xl'>Increment</button>
            <button onClick={handleDecrement} className='px-2.5 py-2 bg-black text-amber-50 mr-1.5 ml-3'>Decrement</button>
            <button onClick={handleReset} className='px-2.5 py-2 bg-black text-amber-50 mr-1.5'>Reset</button>
        </div>
    )
}

export default Counter